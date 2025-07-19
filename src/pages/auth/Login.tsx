import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface LoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const { login, isLoading, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      await login(data.email, data.password, '');
    } catch (error: any) {
      setError(error.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1219] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00FF9D] to-[#00E0FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-bold text-2xl">A</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Welcome to Ark-Wuiot</h1>
          <p className="text-[#B8C2CC] mt-2">AI-Powered IoT Platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1A232E] border border-[#263340] rounded-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-[#FF4D4D]/10 border border-[#FF4D4D] rounded-lg">
              <p className="text-[#FF4D4D] text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="Enter your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="Enter your password"
                {...register('password', { 
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
                className="absolute right-3 top-9 text-[#B8C2CC] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link
              to="/forgot-password"
              className="text-[#00FF9D] hover:text-[#00CC8A] text-sm transition-colors"
            >
              Forgot your password?
            </Link>
            
            <div className="text-[#B8C2CC] text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#00FF9D] hover:text-[#00CC8A] transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[#B8C2CC] text-sm">
            Powered by <span className="text-[#00FF9D] font-semibold">Ark AI</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};