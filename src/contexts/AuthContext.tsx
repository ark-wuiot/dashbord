import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, enableNetwork, disableNetwork } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'integrator' | 'industrial_client';
  phoneNumber?: string;
  avatar?: string;
  createdAt: Date;
  lastLogin: Date;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  error: string;
  success: string;
  isOnline: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string, role?: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  googleLoginRedirect: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Re-enable Firestore network when back online
      enableNetwork(db).catch(console.error);
    };
    const handleOffline = () => {
      setIsOnline(false);
      // Disable Firestore network when offline to prevent errors
      disableNetwork(db).catch(console.error);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check for redirect result on mount
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          await handleAuthSuccess(result.user);
        }
      } catch (error: any) {
        console.error('Redirect result error:', error);
        setError(getErrorMessage(error.code));
      }
    };

    checkRedirectResult();
  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await handleAuthSuccess(firebaseUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuthSuccess = async (firebaseUser: FirebaseUser) => {
    try {
      // Create basic user profile from Firebase Auth data
      const basicUser: UserProfile = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'New User',
        email: firebaseUser.email || '',
        role: 'industrial_client',
        avatar: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      // Set user immediately for faster UI response
      setUser(basicUser);

      // Try to get/update Firestore data in background
      try {
        if (isOnline) {
          // Check if user profile exists in Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            // User profile exists, update last login
            const userData = userDoc.data();
            const updatedUser: UserProfile = {
              uid: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: userData.role || 'industrial_client',
              phoneNumber: userData.phoneNumber,
              avatar: userData.avatar || firebaseUser.photoURL || undefined,
              createdAt: userData.createdAt?.toDate() || new Date(),
              lastLogin: new Date()
            };

            setUser(updatedUser);

            // Update last login time
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              lastLogin: serverTimestamp()
            }, { merge: true });
          } else {
            // New user, create profile
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              ...basicUser,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp()
            });
          }
        }
      } catch (firestoreError: any) {
        console.error('Firestore error during auth success:', firestoreError);
        // Don't fail authentication if Firestore is unavailable
        // User can still authenticate, profile can be saved later
      }
    } catch (error: any) {
      console.error('Error handling auth success:', error);
      setError('Failed to load user profile');
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      case 'auth/popup-closed-by-user':
        return 'Login cancelled';
      case 'auth/popup-blocked':
        return 'Popup blocked by browser. Please allow popups or try again';
      case 'auth/cancelled-popup-request':
        return 'Login cancelled';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email but different sign-in credentials';
      case 'auth/unauthorized-domain':
        return 'This domain is not authorized for Google sign-in. Please contact support.';
      default:
        return 'Authentication failed. Please try again';
    }
  };

  const login = async (email: string, password: string) => {
    if (!isOnline) {
      setError('You are offline. Please check your connection.');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setIsLoading(true);
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string, role?: string) => {
    if (!isOnline) {
      setError('You are offline. Please check your connection.');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setIsLoading(true);
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore (if online)
      if (isOnline) {
        try {
          const userProfile: Partial<UserProfile> = {
            name: name || 'New User',
            role: (role as 'integrator' | 'industrial_client') || 'industrial_client',
            createdAt: new Date(),
            lastLogin: new Date()
          };

          await setDoc(doc(db, 'users', result.user.uid), {
            ...userProfile,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
          });
        } catch (firestoreError: any) {
          console.error('Firestore error during registration:', firestoreError);
          // Don't fail registration if Firestore is unavailable
        }
      }

      setSuccess('Account created successfully!');
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    if (!isOnline) {
      setError('You are offline. Please check your connection.');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setIsLoading(true);
      
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      setSuccess('Google login successful!');
    } catch (error: any) {
      console.error('Google login error:', error);
      setError(getErrorMessage(error.code));
      throw error; // Re-throw to handle popup blocked case
    } finally {
      setIsLoading(false);
    }
  };

  const googleLoginRedirect = async () => {
    if (!isOnline) {
      setError('You are offline. Please check your connection.');
      return;
    }

    try {
      setError('');
      setSuccess('');
      
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      await signInWithRedirect(auth, provider);
      // User will be redirected, no need to set success message
    } catch (error: any) {
      console.error('Google redirect error:', error);
      setError(getErrorMessage(error.code));
    }
  };

  const resetPassword = async (email: string) => {
    if (!isOnline) {
      setError('You are offline. Please check your connection.');
      return;
    }

    try {
      setError('');
      setSuccess('');
      
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(getErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      setError('');
      setSuccess('');
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      setError('Failed to sign out');
    }
  };

  const clearError = () => setError('');
  const clearSuccess = () => setSuccess('');

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    success,
    isOnline,
    login,
    register,
    googleLogin,
    googleLoginRedirect,
    resetPassword,
    logout,
    clearError,
    clearSuccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};