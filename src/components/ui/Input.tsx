import React, { forwardRef } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B8C2CC]" />
        )}
        <input
          ref={ref}
          className={`
            w-full bg-[#263340] border border-[#263340] rounded-lg px-4 py-3 text-[#E0E0E0] 
            placeholder-[#B8C2CC] focus:outline-none focus:ring-2 focus:ring-[#00FF9D] 
            focus:border-[#00FF9D] transition-all duration-200
            ${Icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${error ? 'border-[#FF4D4D] focus:ring-[#FF4D4D]' : ''}
            ${className}
          `}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B8C2CC]" />
        )}
      </div>
      {error && (
        <p className="text-[#FF4D4D] text-sm mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';