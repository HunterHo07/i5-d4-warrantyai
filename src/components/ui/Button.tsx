'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative overflow-hidden',
  ];

  const variantClasses = {
    primary: [
      'bg-gradient-to-r from-neon-blue to-neon-purple',
      'text-black font-semibold',
      'hover:shadow-lg hover:shadow-neon-blue/50',
      'focus:ring-neon-blue',
      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-neon-purple before:to-neon-blue',
      'before:opacity-0 before:transition-opacity before:duration-300',
      'hover:before:opacity-100',
      'transform hover:scale-105 active:scale-95',
    ],
    secondary: [
      'bg-secondary-800 border border-secondary-600',
      'text-white',
      'hover:bg-secondary-700 hover:border-secondary-500',
      'focus:ring-secondary-500',
    ],
    outline: [
      'border-2 border-neon-blue bg-transparent',
      'text-neon-blue',
      'hover:bg-neon-blue hover:text-black',
      'focus:ring-neon-blue',
      'transition-all duration-300',
    ],
    ghost: [
      'bg-transparent text-white',
      'hover:bg-white/10',
      'focus:ring-white/20',
    ],
    neon: [
      'bg-transparent border-2 border-neon-green',
      'text-neon-green font-semibold',
      'hover:bg-neon-green hover:text-black',
      'hover:shadow-lg hover:shadow-neon-green/50',
      'focus:ring-neon-green',
      'animate-pulse hover:animate-none',
    ],
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl',
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
