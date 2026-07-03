import React, { useState } from 'react';
import { Modal } from '@/components/common';
import { Button } from '@/components/common';
import { notify } from '@/utils/helpers';

const initialState = {
  name: '',
  email: '',
  profile: '',
  promo: '',
};

export function AffiliateModal({ open, onClose }) {
  const [form, setForm] = useState(initialState);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    notify('Application submitted. We’ll be in touch within 48 hours.', 'success');
    setForm(initialState);
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} title="Become an Affiliate" contentClassName="max-w-2xl">
      <form onSubmit={submit} className="p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
              Partner Programme
            </div>
            <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Become an Affiliate
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Share Sphere tools and earn recurring commission. This form is ready for database integration later.
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

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name</span>
            <input
              value={form.name}
              onChange={update('name')}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
              placeholder="Your name"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
            <input
              value={form.email}
              onChange={update('email')}
              type="email"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Website / Social Profile</span>
            <input
              value={form.profile}
              onChange={update('profile')}
              type="url"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
              placeholder="https://yoursite.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">How will you promote?</span>
            <textarea
              value={form.promo}
              onChange={update('promo')}
              rows={4}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
              placeholder="YouTube, blog, community..."
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="submit" variant="accent" size="lg" className="rounded-full">
            Submit Application →
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
