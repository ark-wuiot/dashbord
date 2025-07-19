// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, browserPopupRedirectResolver } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPXmwVsYAX8QIOdZdPoaxGH2QofybF6eQ",
  authDomain: "ark-wuiot.firebaseapp.com",
  projectId: "ark-wuiot",
  storageBucket: "ark-wuiot.firebasestorage.app",
  messagingSenderId: "565310109169",
  appId: "1:565310109169:web:867a252987995666dbc050",
  measurementId: "G-Y5DKPRQXGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure auth with popup redirect resolver to handle COOP issues
auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = false;

// Initialize Google Auth Provider with better configuration
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Add these parameters to handle COOP issues
  include_granted_scopes: 'true',
  access_type: 'offline'
});

// Add scopes if needed
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app; 