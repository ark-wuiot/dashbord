import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={`
        bg-[#1A232E] border border-[#263340] rounded-xl p-6 
        ${glow ? 'shadow-lg shadow-[#00FF9D]/10' : ''}
        ${hover ? 'hover:border-[#00FF9D]/30 hover:shadow-lg hover:shadow-[#00FF9D]/20' : ''}
        transition-all duration-300 ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className = ''
}) => {
  const changeColors = {
    positive: 'text-[#2AFFB2]',
    negative: 'text-[#FF4D4D]',
    neutral: 'text-[#B8C2CC]'
  };

  return (
    <Card className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[#B8C2CC] text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-[#00FF9D]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};