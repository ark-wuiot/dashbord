import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const Register: React.FC = () => {
  const { register: registerUser, isLoading, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>();
  const password = watch('password');

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('');
      await registerUser(data.email, data.password, data.name, data.role);
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
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
          <h1 className="text-white text-2xl font-bold">Join Ark-Wuiot</h1>
          <p className="text-[#B8C2CC] mt-2">Start your IoT journey today</p>
        </div>

        {/* Register Form */}
        <div className="bg-[#1A232E] border border-[#263340] rounded-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-[#FF4D4D]/10 border border-[#FF4D4D] rounded-lg">
              <p className="text-[#FF4D4D] text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="Enter your full name"
              {...register('name', { 
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              })}
              error={errors.name?.message}
            />

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
                placeholder="Create a password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
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

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="Confirm your password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                error={errors.confirmPassword?.message}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-[#B8C2CC] hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Account Type
              </label>
              <select
                {...register('role', { required: 'Please select your role' })}
                className="w-full bg-[#263340] border border-[#263340] rounded-lg px-4 py-3 text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FF9D] focus:border-[#00FF9D]"
              >
                <option value="">Select your role</option>
                <option value="integrator">System Integrator</option>
                <option value="industrial_client">Industrial Client</option>
              </select>
              {errors.role && (
                <p className="text-[#FF4D4D] text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="text-[#B8C2CC] text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#00FF9D] hover:text-[#00CC8A] transition-colors"
              >
                Sign in
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