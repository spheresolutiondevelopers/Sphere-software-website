import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card } from '@/components/common';
import { HERO_SCREENS, HERO_STATS, HERO_SUBTITLES, ORB_NODES, PRODUCTS } from '@/data/products';
import { scrollToId } from '@/utils/helpers';

function ShotPreview({ slide }) {
  return (
    <Card className="relative overflow-hidden border-white/10 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.1)] dark:bg-slate-950/80">
      <div className="absolute inset-0 opacity-70" style={{ background: slide.cover }} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300">
            Live Preview
          </div>
          <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {slide.title}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
            {slide.subtitle}
          </p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/85 text-3xl shadow-md dark:bg-slate-900">
          {slide.emoji}
        </div>
      </div>

      <div className="relative mt-5 grid gap-3">
        <div className="h-12 rounded-2xl bg-white/70 p-2 dark:bg-slate-900/80">
          <div className="h-full w-2/3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {slide.shots.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl bg-white/70 p-3 text-[11px] font-semibold text-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
            >
              <div className="mb-3 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-center justify-between gap-2">
                <span>{item}</span>
                <span className="font-mono text-[10px] text-slate-400">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function OrbitalGlobe({ onSelectProduct }) {
  const shellRef = useRef(null);
  const canvasRef = useRef(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0.0025);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const [selected, setSelected] = useState(0);

  const nodes = useMemo(() => {
    return ORB_NODES.map((node, index) => {
      const angle = (Math.PI * 2 * index) / ORB_NODES.length - Math.PI / 2;
      return { ...node, angle };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    if (!canvas || !shell) return undefined;

    const ctx = canvas.getContext('2d');
    let frame = 0;

    const resize = () => {
      const size = shell.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = size.width * scale;
      canvas.height = size.height * scale;
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.34;
      const cx = width / 2;
      const cy = height / 2;

      const gradient = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.25);
      gradient.addColorStop(0, 'rgba(255,255,255,0.35)');
      gradient.addColorStop(0.5, 'rgba(59,130,246,0.16)');
      gradient.addColorStop(1, 'rgba(15,23,42,0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      [0.52, 0.75, 1].forEach((factor) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * factor, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.strokeStyle = 'rgba(255,255,255,0.16)';
      ctx.beginPath();
      for (let i = 0; i < 120; i += 1) {
        const x = cx + Math.cos((i / 120) * Math.PI * 2 + rotationRef.current) * radius;
        const y = cy + Math.sin((i / 120) * Math.PI * 2 + rotationRef.current * 0.7) * radius * 0.6;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      for (let i = 0; i < 24; i += 1) {
        const angle = (i / 24) * Math.PI * 2 + rotationRef.current * 0.85;
        const orbit = radius * 0.92;
        const x = cx + Math.cos(angle) * orbit;
        const y = cy + Math.sin(angle) * orbit * 0.62;
        ctx.beginPath();
        ctx.arc(x, y, i % 3 === 0 ? 2.3 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = window.requestAnimationFrame(() => {
        rotationRef.current += velocityRef.current;
        draw();
      });
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    const handlePointerDown = (event) => {
      draggingRef.current = true;
      lastXRef.current = event.clientX ?? event.touches?.[0]?.clientX ?? 0;
      velocityRef.current = 0;
      shell.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event) => {
      if (!draggingRef.current) return;
      const currentX = event.clientX ?? event.touches?.[0]?.clientX ?? 0;
      const delta = currentX - lastXRef.current;
      rotationRef.current += delta * 0.006;
      velocityRef.current = delta * 0.00035;
      lastXRef.current = currentX;
    };

    const handlePointerUp = () => {
      draggingRef.current = false;
      velocityRef.current = Math.sign(velocityRef.current || 1) * 0.0025;
      shell.style.cursor = 'grab';
    };

    shell.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      shell.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const orbit = (index) => {
    return (Math.PI * 2 * index) / nodes.length - Math.PI / 2 + rotationRef.current * 0.2;
  };

  const selectNode = (node, index) => {
    setSelected(index);
    if (node.id in PRODUCTS) {
      onSelectProduct(node.id);
    }
  };

  return (
    <div className="space-y-4">
      <div ref={shellRef} className="orb-shell aspect-square w-full max-w-[520px] cursor-grab select-none">
        <canvas ref={canvasRef} className="orb-canvas" />
        {nodes.map((node, index) => {
          const angle = orbit(index);
          const radius = 43;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius * 0.62;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => selectNode(node, index)}
              className={`orb-node ${selected === index ? 'is-active' : ''}`}
              style={{ left: `${x}%`, top: `${y}%`, boxShadow: `0 18px 42px ${node.glow}` }}
              aria-label={node.title}
            >
              <span className="text-2xl">{node.emoji}</span>
            </button>
          );
        })}

        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-[42px] border border-white/20 bg-white/72 px-6 py-5 text-center shadow-2xl backdrop-blur-md dark:bg-slate-950/70">
            <div className="text-5xl">🌐</div>
            <div className="mt-3 font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Sphere
            </div>
            <div className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-300">
              Drag to rotate
            </div>
          </div>
        </div>
      </div>

      <Card className="rounded-[30px] border-white/10 p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-2xl">
            {nodes[selected]?.emoji}
          </div>
          <div>
            <div className="font-display text-lg font-bold text-slate-950 dark:text-white">
              {nodes[selected]?.title}
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {nodes[selected]?.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function Hero({ onOpenProduct, onOpenChat }) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const featuredPoints = [
    'Product-first design with clear spacing',
    'Database-ready structure for later integration',
    'Modals, chat, theme, and toasts already wired',
  ];

  useEffect(() => {
    const subtitleTimer = window.setInterval(() => {
      setSubtitleIndex((value) => (value + 1) % HERO_SUBTITLES.length);
    }, 4200);

    const slideTimer = window.setInterval(() => {
      setSlideIndex((value) => (value + 1) % HERO_SCREENS.length);
    }, 5200);

    return () => {
      window.clearInterval(subtitleTimer);
      window.clearInterval(slideTimer);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden pt-24 lg:pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_33%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.16),transparent_28%)]" />
      <div className="section-shell mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl items-center py-10 lg:py-12">
        <div className="grid w-full gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              Sphere Software Solutions
            </div>

            <div className="space-y-4">
              <h1 className="max-w-2xl font-display text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                Innovative software for
                <span className="gradient-text block">every sphere of life.</span>
              </h1>
              <div className="max-w-2xl">
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {HERO_SUBTITLES[subtitleIndex]}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {HERO_SUBTITLES.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSubtitleIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === subtitleIndex ? 'w-8 bg-cyan-500' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                      }`}
                      aria-label={`Show subtitle ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="accent" size="lg" onClick={() => scrollToId('products')} className="rounded-full">
                Explore Products →
              </Button>
              <Button variant="secondary" size="lg" onClick={onOpenChat} className="rounded-full">
                Contact Sales
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {HERO_STATS.map((stat) => (
                <Card key={stat.label} className="rounded-[26px] p-5">
                  <div className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </Card>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {featuredPoints.map((point) => (
                <Card key={point} className="rounded-[24px] p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{point}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <ShotPreview slide={HERO_SCREENS[slideIndex]} />
            <OrbitalGlobe onSelectProduct={onOpenProduct} />
          </div>
        </div>
      </div>
    </section>
  );
}
