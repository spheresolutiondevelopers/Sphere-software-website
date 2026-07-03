import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/helpers';

export function Modal({ open, onClose, title, children, className = '', contentClassName = '' }) {
  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className={cn('fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-md', className)} onMouseDown={onClose}>
      <div
        className={cn('w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[var(--surface-alt)] shadow-[0_30px_100px_rgba(2,6,23,0.45)]', contentClassName)}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
