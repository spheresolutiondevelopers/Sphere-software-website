// src/pages/Home/sections/Hero/index.jsx
import React, { useState, useEffect } from 'react';
import { scrollToId } from '@/utils/helpers';
import { HERO_SUBTITLES, HERO_STATS } from '@/data/heroData';
import HeroScreenshots from './HeroScreenshots';
import HeroTextBlock from './HeroTextBlock';
import OrbitalGlobe from './OrbitalGlobe';
import styles from './Hero.module.css';

export function Hero({ onOpenProduct, onOpenChat }) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % HERO_SUBTITLES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden pt-24 lg:pt-28">
      {/* Background orbs & grid – these use global classes defined in theme.css */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb1" />
        <div className="hero-orb hero-orb2" />
        <div className="hero-orb hero-orb3" />
        <div className="hero-orb hero-orb4" />
      </div>

      {/* Container with padding matching HTML: larger on wider screens */}
      <div className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20" style={{ maxWidth: '1440px' }}>
        <div className={styles.heroContent}>
          {/* Full‑width title row */}
          <div className={styles.heroTitle}>
            <h1 className="display hero-h1">
              Innovative Software for Every <span className="grad-text">Sphere</span> of Life
            </h1>
          </div>

          {/* Left column: screenshots + text block */}
          <div className={styles.heroLeft}>
            <HeroScreenshots />
            <HeroTextBlock
              subtitles={HERO_SUBTITLES}
              activeIndex={subtitleIndex}
              stats={HERO_STATS}
              onOpenChat={onOpenChat}
              onOpenProduct={onOpenProduct}
            />
          </div>

          {/* Right column: Orbital globe + description panel */}
          <div className={styles.heroRight}>
            <OrbitalGlobe />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-ind">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

export default Hero;