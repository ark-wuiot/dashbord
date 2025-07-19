import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  Wifi, 
  WifiOff,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface AuthFormData {
  email: string;
  password: string;
}

export const Auth: React.FC = () => {
  const { 
    login, 
    register, 
    googleLogin, 
    googleLoginRedirect,
    resetPassword,
    isLoading,
    error,
    success,
    isOnline
  } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [googleLoginAttempted, setGoogleLoginAttempted] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<AuthFormData>();

  const watchedEmail = watch('email');

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success, reset]);

  const onSubmit = async (data: AuthFormData) => {
    if (isLogin) {
      await login(data.email, data.password);
    } else {
      await register(data.email, data.password);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoginAttempted(true);
    try {
      await googleLogin();
    } catch (error) {
      console.log('Popup blocked, trying redirect...');
      // If popup is blocked, try redirect method
      await googleLoginRedirect();
    }
  };

  const handleResetPassword = async () => {
    if (!watchedEmail) {
      return;
    }
    setIsResettingPassword(true);
    try {
      await resetPassword(watchedEmail);
    } finally {
      setIsResettingPassword(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsResettingPassword(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1219] via-[#1A232E] to-[#0D1219] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00FF9D]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00E0FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Network Status */}
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              key="network-offline"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 rounded-xl flex items-center space-x-3"
            >
              <WifiOff className="w-5 h-5 text-[#FF4D4D]" />
              <div>
                <p className="text-[#FF4D4D] font-medium text-sm">You're offline</p>
                <p className="text-[#FF4D4D]/70 text-xs">Please check your connection</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A232E]/80 backdrop-blur-xl border border-[#263340] rounded-2xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4">
              <img 
                src="/logo/siticonart.png" 
                alt="Ark-Wuiot Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isResettingPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Create Account')}
            </h1>
            <p className="text-[#B8C2CC] text-sm">
              {isResettingPassword 
                ? 'Enter your email to receive a reset link'
                : (isLogin 
                  ? 'Sign in to your Ark-Wuiot account' 
                  : 'Join the future of industrial IoT'
                )
              }
            </p>
          </div>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                key="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 rounded-xl flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-[#FF4D4D] flex-shrink-0" />
                <div>
                  <p className="text-[#FF4D4D] font-medium text-sm">Authentication Error</p>
                  <p className="text-[#FF4D4D]/70 text-xs">{error}</p>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-[#00FF9D]/10 border border-[#00FF9D]/20 rounded-xl flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-[#00FF9D] flex-shrink-0" />
                <div>
                  <p className="text-[#00FF9D] font-medium text-sm">Success!</p>
                  <p className="text-[#00FF9D]/70 text-xs">{success}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Reset Form */}
          {isResettingPassword ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...registerField('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={errors.email?.message}
                />
              </div>

              <Button
                onClick={handleResetPassword}
                disabled={!watchedEmail || isResettingPassword}
                variant="primary"
                className="w-full"
              >
                {isResettingPassword ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Reset Link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>

              <button
                onClick={() => setIsResettingPassword(false)}
                className="w-full text-[#B8C2CC] hover:text-white text-sm transition-colors"
              >
                Back to {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          ) : (
            <>
              {/* Google Login Button */}
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading || !isOnline}
                variant="secondary"
                className="w-full mb-6"
              >
                {googleLoginAttempted && isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in with Google...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#263340]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1A232E] text-[#B8C2CC]">or</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...registerField('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    error={errors.email?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...registerField('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      error={errors.password?.message}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B8C2CC] hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setIsResettingPassword(true)}
                      className="text-[#00FF9D] hover:text-[#00E0FF] text-sm transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !isOnline}
                  variant="primary"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Toggle Mode */}
              <div className="text-center mt-6">
                <p className="text-[#B8C2CC] text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={toggleMode}
                    className="text-[#00FF9D] hover:text-[#00E0FF] font-medium ml-1 transition-colors"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[#B8C2CC] text-xs">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#00FF9D] hover:text-[#00E0FF] transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#00FF9D] hover:text-[#00E0FF] transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}; 