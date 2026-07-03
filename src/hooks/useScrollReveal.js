import { useEffect } from 'react';

export function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const elements = Array.from(document.querySelectorAll(selector));
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [selector]);
}
