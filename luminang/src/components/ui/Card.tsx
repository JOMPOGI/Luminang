import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx(
      'bg-zinc-900 border border-zinc-800 rounded-lg p-6',
      className
    )}>
      {children}
    </div>
  );
}