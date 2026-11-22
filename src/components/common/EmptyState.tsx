import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'text-center py-12 px-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 mb-4">
        <Icon className="w-6 h-6 text-sky-600" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
