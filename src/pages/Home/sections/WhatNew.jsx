import React, { useMemo, useState } from 'react';
import { Card } from '@/components/common';
import { UPDATE_FILTERS, UPDATES } from '@/data/updates';

export function WhatNew() {
  const [filter, setFilter] = useState('all');

  const items = useMemo(() => {
    return filter === 'all' ? UPDATES : UPDATES.filter((item) => item.cat === filter);
  }, [filter]);

  return (
    <section id="whatsnew" className="relative py-24">
      <div className="section-shell mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
            What&apos;s New
          </div>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Latest <span className="gradient-text-2">Updates</span> and improvements
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Filter the update feed to focus on the products or release stream you care about most.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {UPDATE_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${filter === item.id ? 'border-cyan-500 bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((update) => (
            <Card
              key={update.id}
              className="reveal relative overflow-hidden rounded-[28px] border-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
            >
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: update.color }} />
              <div className="flex items-center justify-between gap-3">
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ background: update.tagBg, color: update.color }}
                >
                  {update.tag}
                </span>
                <span className="font-mono text-[11px] text-slate-400">{update.date}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                {update.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{update.body}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: update.color }}>
                Read update <span>→</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <div className="font-display text-5xl font-black tracking-tight gradient-text-2">{items.length}</div>
          <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">Visible updates in this filter</div>
        </div>
      </div>
    </section>
  );
}
