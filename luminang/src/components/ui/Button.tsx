import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' && 'focus:ring-gold-600 focus:ring-offset-black',
        variant === 'secondary' && 'focus:ring-gold-500 focus:ring-offset-black',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}