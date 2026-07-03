import React from 'react';
import { Button, Card } from '@/components/common';
import { Hero } from './sections/Hero.jsx';
import { Products } from './sections/Products.jsx';
import { WhatNew } from './sections/WhatNew.jsx';
import { Contact } from './sections/Contact.jsx';
import { notify, scrollToId } from '@/utils/helpers';
import styles from './Home.module.css';
import { PRODUCT_LIST } from '@/data/products';

const commissionRates = [
  { id: 'scheduling', name: 'Sphere Scheduling', emoji: '📅', rate: '20%', cookie: '90 days', accent: 'var(--product-scheduling)' },
  { id: 'telegram', name: 'Telegram Copier', emoji: '⚡', rate: '25%', cookie: '90 days', accent: 'var(--product-telegram)' },
  { id: 'agri', name: 'Agricultural Suite', emoji: '🌿', rate: '15%', cookie: '60 days', accent: 'var(--product-agri)' },
  { id: 'finance', name: 'Finance Management', emoji: '💰', rate: '18%', cookie: '60 days', accent: 'var(--product-finance)' },
];

function CommissionSection({ onOpenAffiliate }) {
  return (
    <section id="commission" className="relative py-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(96,165,250,0.05),rgba(20,184,166,0.04),rgba(251,191,36,0.04))]" />
      <div className="section-shell relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
              Partner Programme
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Earn recurring commission — <span className="gradient-text">20%</span> for the first year
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Join partners earning consistent income by sharing the tools they love. Transparent rates, long cookie windows, and a clean affiliate experience.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: 'Sign up as an affiliate',
                  body: 'Create your partner account in under 2 minutes — no approval wait and no minimum audience requirement.',
                },
                {
                  title: 'Share your unique link',
                  body: 'Use your personal tracking link anywhere — blog posts, YouTube, social media, or email newsletters.',
                },
                {
                  title: 'Earn for every paid user',
                  body: 'Receive recurring commission for every month your referrals remain active. Payouts are monthly.',
                },
              ].map((step, index) => (
                <Card key={step.title} className="flex gap-4 rounded-[26px] p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 font-display text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-slate-950 dark:text-white">{step.title}</div>
                    <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.body}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="accent" size="lg" className="mt-8 rounded-full" onClick={onOpenAffiliate}>
              Become an Affiliate →
            </Button>
          </div>

          <div className="reveal space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Card className="rounded-[28px] p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Testimonials</div>
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border-l-4 border-cyan-500 bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">
                    “I&apos;ve been recommending Sphere Scheduling to my coaching clients for 6 months. The recurring commission adds up to a real passive income stream.”
                    <div className="mt-2 font-semibold text-cyan-600 dark:text-cyan-400">— Amara K., Business Coach</div>
                  </div>
                  <div className="rounded-2xl border-l-4 border-teal-500 bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">
                    “Telegram Copier basically sells itself to my trading community. Easy 25% on every subscription.”
                    <div className="mt-2 font-semibold text-teal-600 dark:text-teal-400">— Felix R., Trading Community Owner</div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[28px] p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Commission Rates</div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Software</th>
                        <th className="px-4 py-3">Rate</th>
                        <th className="px-4 py-3">Cookie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissionRates.map((row) => (
                        <tr key={row.id} className="border-t border-slate-200 dark:border-slate-800">
                          <td className="px-4 py-4 text-slate-700 dark:text-slate-200">
                            <span className="flex items-center gap-2 font-semibold">
                              <span>{row.emoji}</span>
                              {row.name}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-display text-lg font-extrabold" style={{ color: row.accent }}>
                            {row.rate}
                          </td>
                          <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{row.cookie}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <Card className="rounded-[28px] p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Why partners stay</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  'Monthly recurring payouts',
                  'Friendly support and onboarding',
                  'Simple tracking and reporting',
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 dark:bg-slate-950/50 dark:text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection({ onOpenProduct, onOpenChat }) {
  return (
    <footer className="relative overflow-hidden bg-slate-950 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(20,184,166,0.14),transparent_24%)]" />
      <div className="section-shell relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="font-display text-3xl font-black tracking-tight">Sphere Software</div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
              Innovative software solutions built for every sphere of modern life. We craft tools that are powerful, intuitive, and built to last.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {['in', '✕', '⌥', '✈'].map((icon, index) => (
                <button
                  key={icon}
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10"
                  onClick={() => notify(['LinkedIn', 'X / Twitter', 'GitHub', 'Telegram'][index], 'info')}
                  aria-label={['LinkedIn', 'X / Twitter', 'GitHub', 'Telegram'][index]}
                >
                  {icon}
                </button>
              ))}
            </div>

            <div className="mt-8 max-w-lg">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/40">Newsletter</div>
              <div className="mt-3 flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-400"
                />
                <Button variant="accent" size="md" className="rounded-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Products</div>
              <div className="mt-4 grid gap-3 text-sm text-white/75">
                {PRODUCT_LIST.map((product) => (
                  <button key={product.id} type="button" onClick={() => onOpenProduct(product.id)} className="text-left transition hover:text-white">
                    {product.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Company</div>
              <div className="mt-4 grid gap-3 text-sm text-white/75">
                <button type="button" onClick={() => scrollToId('whatsnew')} className="text-left transition hover:text-white">
                  What&apos;s New
                </button>
                <button type="button" onClick={() => scrollToId('commission')} className="text-left transition hover:text-white">
                  Commission
                </button>
                <button type="button" onClick={() => scrollToId('contact')} className="text-left transition hover:text-white">
                  Contact
                </button>
                <button type="button" onClick={() => notify('Careers will be added later.', 'info')} className="text-left transition hover:text-white">
                  Careers
                </button>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Support</div>
              <div className="mt-4 grid gap-3 text-sm text-white/75">
                <button type="button" onClick={onOpenChat} className="text-left transition hover:text-white">
                  Live Chat
                </button>
                <button type="button" onClick={() => notify('Documentation will be connected to the knowledge base later.', 'info')} className="text-left transition hover:text-white">
                  Documentation
                </button>
                <button type="button" onClick={() => notify('System status dashboard coming soon.', 'info')} className="text-left transition hover:text-white">
                  System Status
                </button>
                <button type="button" onClick={() => notify('Privacy policy will be linked later.', 'info')} className="text-left transition hover:text-white">
                  Privacy Policy
                </button>
                <button type="button" onClick={() => notify('Terms of service will be linked later.', 'info')} className="text-left transition hover:text-white">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Sphere Software Solutions. All rights reserved.</div>
          <div className="flex gap-4">
            <button type="button" onClick={() => notify('Privacy coming soon.', 'info')} className="transition hover:text-white">
              Privacy
            </button>
            <button type="button" onClick={() => notify('Terms coming soon.', 'info')} className="transition hover:text-white">
              Terms
            </button>
            <button type="button" onClick={() => notify('Cookies coming soon.', 'info')} className="transition hover:text-white">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Home({ onOpenProduct, onOpenAffiliate, onOpenChat }) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Hero onOpenProduct={onOpenProduct} onOpenChat={onOpenChat} />
        <Products onOpenProduct={onOpenProduct} />
        <WhatNew />
        <CommissionSection onOpenAffiliate={onOpenAffiliate} />
        <Contact onOpenChat={onOpenChat} />
        <FooterSection onOpenProduct={onOpenProduct} onOpenChat={onOpenChat} />
      </div>
    </main>
  );
}
