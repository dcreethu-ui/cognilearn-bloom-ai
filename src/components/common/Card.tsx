import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl border border-cream-300/80 shadow-warm overflow-hidden transition-all duration-200',
        hoverEffect && 'hover:shadow-warm-md hover:border-terracotta-300/80 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('px-6 py-4 border-b border-cream-200 flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={cn('text-base sm:text-lg font-bold text-espresso-900 tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p className={cn('text-xs sm:text-sm text-espresso-600/80 mt-0.5', className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('p-6', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('px-6 py-4 bg-cream-50/70 border-t border-cream-200 flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);
