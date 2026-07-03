import React from 'react';
import { cn } from '@/utils/helpers';

const variants = {
  primary:
    'bg-slate-950 text-white shadow-lg shadow-slate-950/10 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-950/20 dark:bg-white dark:text-slate-950',
  secondary:
    'bg-white text-slate-950 border border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent dark:text-slate-200 dark:hover:bg-slate-800',
  accent:
    'bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 hover:shadow-xl',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-sm',
  lg: 'px-5 py-3.5 text-base',
};

export const Button = React.forwardRef(function Button(
  { as: Component = 'button', variant = 'primary', size = 'md', className, type = 'button', ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      type={Component === 'button' ? type : undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
