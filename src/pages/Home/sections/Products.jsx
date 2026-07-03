import React from 'react';
import { Button, Card } from '@/components/common';
import { PRODUCT_LIST } from '@/data/products';

export function Products({ onOpenProduct }) {
  return (
    <section id="products" className="relative py-24">
      <div className="section-shell mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
            Our Products
          </div>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Our <span className="gradient-text">Sphere</span> of Solutions
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Every tool you need, built with precision and care. Download, explore, and integrate seamlessly into your workflow.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PRODUCT_LIST.map((product) => (
            <Card
              key={product.id}
              className="group reveal overflow-hidden rounded-[30px] border-white/10 transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
            >
              <button type="button" onClick={() => onOpenProduct(product.id)} className="block h-full w-full text-left">
                <div className="relative h-44 overflow-hidden" style={{ background: product.cover }}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_40%)]" />
                  <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/85 text-2xl shadow-md">
                    {product.emoji}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/75 p-3 shadow-lg backdrop-blur-sm dark:bg-slate-950/70">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {product.version}
                      </div>
                      <div className="text-xs font-mono text-slate-400">{product.versionDate}</div>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-2 rounded-full"
                        style={{ background: product.accent, width: '68%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Learn more</div>
                    <span className="text-lg text-slate-400 transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
