/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['DM Mono', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        background: 'var(--bg)',
        surface: 'var(--surface)',
        surfaceAlt: 'var(--surface-alt)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(94, 234, 212, 0.16)',
        glowStrong: '0 26px 80px rgba(59, 130, 246, 0.2)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        spinSlow: 'spinSlow 18s linear infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
