export const TOAST_EVENT = 'sphere:toast';

export function notify(message, variant = 'info') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: { message, variant } }));
}

export function scrollToId(id) {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
