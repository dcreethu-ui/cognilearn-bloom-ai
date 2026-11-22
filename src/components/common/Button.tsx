import React from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from './Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'warm';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-warm hover:shadow-warm-md focus:ring-terracotta-400 border border-transparent',
    secondary: 'bg-cream-200 hover:bg-cream-300 text-espresso-900 focus:ring-cream-400 border border-cream-300/60',
    outline: 'bg-white hover:bg-cream-50 text-espresso-800 border border-cream-300 shadow-sm focus:ring-terracotta-400',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-400 border border-transparent',
    ghost: 'bg-transparent hover:bg-cream-200/60 text-espresso-800 focus:ring-cream-300',
    warm: 'bg-gradient-to-r from-terracotta-500 to-amber-500 hover:from-terracotta-600 hover:to-amber-600 text-white shadow-warm hover:shadow-warm-md focus:ring-terracotta-400',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner size="sm" className="mr-2 text-current" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
