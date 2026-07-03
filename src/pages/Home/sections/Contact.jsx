import React, { useState } from 'react';
import { Button, Card } from '@/components/common';
import { notify } from '@/utils/helpers';

const initialForm = {
  name: '',
  email: '',
  product: '',
  message: '',
};

export function Contact({ onOpenChat }) {
  const [form, setForm] = useState(initialForm);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    notify('Message sent. We’ll reply within 2 hours.', 'success');
    setForm(initialForm);
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="section-shell mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
            Contact
          </div>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Let&apos;s start a <span className="gradient-text">conversation</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Send a note, ask a question, or open chat if you want a quicker answer. This form is ready for backend hookup later.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="reveal rounded-[30px] p-6 md:p-8">
            <form onSubmit={submit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name</span>
                  <input
                    value={form.name}
                    onChange={update('name')}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email Address</span>
                  <input
                    value={form.email}
                    onChange={update('email')}
                    type="email"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
                    placeholder="jane@example.com"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Software Interest</span>
                <select
                  value={form.product}
                  onChange={update('product')}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
                >
                  <option value="">Select a product…</option>
                  <option>Sphere Scheduling</option>
                  <option>Telegram Copier</option>
                  <option>Agricultural Suite</option>
                  <option>Finance Management</option>
                  <option>General Inquiry</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Message</span>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  rows={6}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
                  placeholder="Tell us how we can help…"
                />
              </label>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button type="submit" variant="accent" size="lg" className="rounded-full">
                  Send Message →
                </Button>
                <Button type="button" variant="secondary" size="lg" onClick={onOpenChat} className="rounded-full">
                  Open Chat
                </Button>
              </div>
            </form>
          </Card>

          <div className="reveal space-y-5">
            <Card
              className="overflow-hidden rounded-[30px] p-0"
              onClick={() => notify('Opening Google Maps…', 'info')}
            >
              <div className="flex min-h-[220px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),rgba(20,184,166,0.14),rgba(15,23,42,0.08))] p-8 text-center">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white/85 text-3xl shadow-lg dark:bg-slate-900/80">
                    📍
                  </div>
                  <div className="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                    Sphere HQ
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Ongata Rongai<br />
                    Nairobi, Kenya
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid gap-4">
              <Card className="reveal flex items-center gap-4 rounded-[26px] p-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-500/10 text-2xl">📞</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Phone</div>
                  <div className="mt-1 font-semibold text-slate-950 dark:text-white">+254 790 638 246</div>
                </div>
              </Card>
              <Card className="reveal flex items-center gap-4 rounded-[26px] p-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-2xl">✉️</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Email</div>
                  <div className="mt-1 font-semibold text-slate-950 dark:text-white">spheresolutiondevelopers@gmail.com</div>
                </div>
              </Card>
              <Card className="reveal rounded-[26px] p-5">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Support Hours</div>
                <div className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <div>Mon–Fri: 8:00 AM – 6:00 PM</div>
                  <div>Sat: 9:00 AM – 2:00 PM</div>
                  <div>Sun: Closed</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
