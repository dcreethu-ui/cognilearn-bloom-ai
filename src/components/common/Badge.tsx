import React from 'react';
import { cn } from '../../lib/utils';
import { BloomLevel } from '../../types/bloom.types';
import { BLOOM_LEVELS } from '../../lib/bloomTaxonomy';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'warm';
  bloomLevel?: BloomLevel;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  bloomLevel,
  size = 'md',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  if (bloomLevel) {
    const meta = BLOOM_LEVELS[bloomLevel];
    return (
      <span
        className={cn(
          'inline-flex items-center font-bold rounded-full border shadow-2xs',
          meta?.bgColor || 'bg-cream-100',
          meta?.textColor || 'text-espresso-800',
          meta?.borderColor || 'border-cream-300',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <span
          className="w-2 h-2 rounded-full mr-1.5 shrink-0"
          style={{ backgroundColor: meta?.color || '#C7571B' }}
        />
        {children || meta?.label || bloomLevel}
      </span>
    );
  }

  const variantStyles = {
    default: 'bg-cream-100 text-espresso-800 border-cream-300',
    neutral: 'bg-cream-200/80 text-espresso-700 border-cream-300/80',
    warm: 'bg-terracotta-100 text-terracotta-800 border-terracotta-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
