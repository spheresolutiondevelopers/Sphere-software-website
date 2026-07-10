// src/pages/Home/sections/Hero/HeroScreenshots.jsx
import React, { useState, useEffect } from 'react';
import { HERO_SCREENSHOTS } from '@/data/heroData';
import styles from './Hero.module.css';

const HeroScreenshots = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SCREENSHOTS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroProductShots}>
      {HERO_SCREENSHOTS.map((slide, idx) => (
        <div
          key={slide.id}
          className={`${styles.hpsSlide} ${idx === current ? styles.active : ''}`}
        >
          {slide.cards.map((card, cardIdx) => (
            <div key={cardIdx} className={styles.hpsCard}>
              <div className={styles.hpsHdr}>
                <div className={styles.hpsIco} style={{ background: card.color }}>
                  {card.emoji}
                </div>
                <span>{card.title}</span>
                <span className={styles.hpsTag}>{card.tag}</span>
              </div>
              <div className={styles.hpsBody}>
                {card.month && <div className={styles.hpsMonth}>{card.month}</div>}

                {card.slots && (
                  <div className={styles.hpsSlots}>
                    {card.slots.map((slot, si) => {
                      if (slot.type === 'off') {
                        return <div key={si} className={styles.hpsOff} />;
                      }
                      const classNames = [styles.hpsSlot, styles.hpsOn];
                      if (slot.class) {
                        // Split class string and add known modifiers
                        slot.class.split(' ').forEach(cls => {
                          if (cls === 'c2') classNames.push(styles.c2);
                          else if (cls === 'c3') classNames.push(styles.c3);
                          // Add more if needed
                        });
                      }
                      const style = slot.style || {};
                      if (slot.extra && slot.extra.style) {
                        Object.assign(style, slot.extra.style);
                      }
                      return (
                        <div key={si} className={classNames.join(' ')} style={style}>
                          <span>{slot.label}</span>
                          {slot.extra && slot.extra.right && (
                            <span style={{ marginLeft: 'auto' }}>{slot.extra.right}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {card.metrics && (
                  <div className={styles.hpsMsRow}>
                    {card.metrics.map((metric, mi) => (
                      <div key={mi} className={styles.hpsMs}>
                        <div className={styles.hpsMsN} style={{ color: metric.color }}>
                          {metric.value}
                        </div>
                        <div className={styles.hpsMsL}>{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {card.chart && (
                  <div className={styles.hpsChart}>
                    <svg width="100%" height="52" viewBox="0 0 220 52" preserveAspectRatio="none">
                      <defs>
                        <linearGradient
                          id={card.chart.gradientId}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={card.chart.gradientColors[0]}
                          />
                          <stop
                            offset="100%"
                            stopColor={card.chart.gradientColors[1]}
                          />
                        </linearGradient>
                      </defs>
                      <path d={card.chart.path} fill={`url(#${card.chart.gradientId})`} />
                      <path
                        d={card.chart.line}
                        fill="none"
                        stroke={card.chart.lineColor}
                        strokeWidth="1.5"
                      />
                      {card.chart.dot && (
                        <circle
                          cx={card.chart.dot.cx}
                          cy={card.chart.dot.cy}
                          r="3"
                          fill={card.chart.dot.fill}
                        />
                      )}
                    </svg>
                  </div>
                )}

                {card.pairs && (
                  <div className={styles.hpsPairs}>
                    {card.pairs.map((pair, pi) => (
                      <div key={pi} className={styles.hpsPair}>
                        <span className={styles.hpsPn}>{pair.name}</span>
                        <span className={styles.hpsPp}>{pair.price}</span>
                        <span
                          className={`${styles.hpsPc} ${
                            pair.changeClass === 'pos'
                              ? styles.hpsPos
                              : styles.hpsNeg
                          }`}
                        >
                          {pair.change}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {card.sig && (
                  <div className={styles.hpsSig} style={card.sigStyle || {}}>
                    {card.sig}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HeroScreenshots;