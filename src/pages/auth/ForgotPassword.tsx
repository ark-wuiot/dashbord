import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface ForgotPasswordForm {
  email: string;
}

export const ForgotPassword: React.FC = () => {
  const { resetPassword, isLoading } = useAuth();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setError('');
      setSuccess(false);
      await resetPassword(data.email);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
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
          <h1 className="text-white text-2xl font-bold">Reset Password</h1>
          <p className="text-[#B8C2CC] mt-2">Enter your email to receive reset instructions</p>
        </div>

        {/* Reset Form */}
        <div className="bg-[#1A232E] border border-[#263340] rounded-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-[#FF4D4D]/10 border border-[#FF4D4D] rounded-lg">
              <p className="text-[#FF4D4D] text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-[#00FF9D]/10 border border-[#00FF9D] rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#00FF9D]" />
                <p className="text-[#00FF9D] text-sm">
                  Password reset email sent! Check your inbox for instructions.
                </p>
              </div>
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

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full"
              disabled={success}
            >
              Send Reset Instructions
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-[#00FF9D] hover:text-[#00CC8A] text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
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