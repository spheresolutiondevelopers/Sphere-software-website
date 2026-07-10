// src/pages/Home/sections/Hero/HeroTextBlock.jsx
import React from 'react';
import { Button } from '@/components/common';
import { scrollToId } from '@/utils/helpers';
import styles from './Hero.module.css';

const HeroTextBlock = ({ subtitles, activeIndex, stats, onOpenChat, onOpenProduct }) => {
  return (
    <div className={styles.heroTextBlock}>
      {/* Rotating subtitle */}
      <div className={styles.heroRotateWrap}>
        {subtitles.map((text, idx) => (
          <p
            key={idx}
            className={`${styles.heroSubMsg} ${idx === activeIndex ? styles.active : ''}`}
          >
            {text}
          </p>
        ))}
      </div>
      <div className={styles.heroSubDots}>
        {subtitles.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.heroSubDot} ${idx === activeIndex ? styles.active : ''}`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className={styles.heroBtns}>
        <Button variant="accent" size="lg" onClick={() => scrollToId('products')}>
          Explore Products →
        </Button>
        <Button variant="secondary" size="lg" onClick={onOpenChat}>
          Contact Sales
        </Button>
      </div>

      {/* Stats */}
      <div className={styles.heroStats}>
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="display hero-stat-val grad-text">{stat.value}</div>
            <div className="hero-stat-lbl">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroTextBlock;