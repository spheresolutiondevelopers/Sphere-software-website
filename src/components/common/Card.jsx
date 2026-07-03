import React from 'react';
import { cn } from '@/utils/helpers';

export const Card = React.forwardRef(function Card(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('rounded-3xl border border-white/10 bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-slate-900/80', className)}
      {...props}
    >
      {children}
    </div>
  );
});
