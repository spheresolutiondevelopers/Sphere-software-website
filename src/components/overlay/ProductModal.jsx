import React from 'react';
import { Modal } from '@/components/common';
import { Button } from '@/components/common';
import { notify } from '@/utils/helpers';

export function ProductModal({ open, product, onClose, onOpenChat }) {
  if (!product) return null;

  const handleAction = (action) => {
    if (action.intent === 'chat') {
      onClose?.();
      onOpenChat?.();
      return;
    }

    notify(action.message || 'Action triggered', 'info');
  };

  return (
    <Modal open={open} onClose={onClose} title={product.name} contentClassName="max-w-6xl">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className="relative overflow-hidden p-8 text-slate-950 dark:text-white"
          style={{ background: product.cover }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_40%)]" />
          <div className="relative">
            <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/75 text-4xl shadow-lg">
              {product.emoji}
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
              Product Detail
            </div>
            <h3 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
              {product.name}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900">
                {product.version}
              </span>
              <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900">
                {product.versionDate}
              </span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {product.shots.map((shot) => (
                <div key={shot} className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                  {shot}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="custom-scroll max-h-[85vh] overflow-y-auto p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
                Highlights
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Designed for later database integration and backend wiring.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              ✕
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200"
              >
                {feature}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Version notes</div>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{product.versionNotes}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {product.actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant}
                size="md"
                onClick={() => handleAction(action)}
                className="rounded-full"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
