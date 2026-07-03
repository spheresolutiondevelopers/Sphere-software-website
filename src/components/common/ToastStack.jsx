import React from 'react';

export function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-stack pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-${toast.variant}`}>
          <div className="mt-0.5 text-base">{toast.variant === 'success' ? '✅' : toast.variant === 'error' ? '⛔' : toast.variant === 'warning' ? '⚠️' : '💬'}</div>
          <div className="flex-1">
            <div className="text-sm font-semibold">{toast.message}</div>
          </div>
          <button
            type="button"
            className="pointer-events-auto text-sm font-semibold opacity-80 transition hover:opacity-100"
            onClick={() => onDismiss(toast.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
