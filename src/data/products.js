export const HERO_SUBTITLES = [
  'Our products include Sphere Scheduling, Telegram Copier, Agricultural Suite and Finance Management.',
  'Follow us for the latest product drops, releases, and feature updates.',
  'Trusted by thousands of users across many regions and industries.',
  'Join our affiliate programme and earn recurring commission for referrals.',
  'Fast, polished software designed for real-world operations.',
];

export const HERO_STATS = [
  { value: '24,000+', label: 'Active Users' },
  { value: '4', label: 'Products' },
  { value: '99.9%', label: 'Uptime' },
];

export const ORB_NODES = [
  { id: 'scheduling', emoji: '📅', title: 'Scheduling', description: 'AI scheduling, booking, and calendar sync.', glow: 'rgba(45,212,160,0.75)' },
  { id: 'telegram', emoji: '⚡', title: 'Telegram Copier', description: 'Forward messages with filters and delay rules.', glow: 'rgba(124,108,248,0.75)' },
  { id: 'agri', emoji: '🌿', title: 'Agricultural Suite', description: 'Crop intelligence, disease detection, and farm insights.', glow: 'rgba(255,107,138,0.75)' },
  { id: 'finance', emoji: '💰', title: 'Finance Management', description: 'Track income, spending, budgets, and reports.', glow: 'rgba(255,200,80,0.75)' },
  { id: 'analytics', emoji: '📊', title: 'Analytics', description: 'Clean dashboards and actionable insights.', glow: 'rgba(34,211,238,0.75)' },
  { id: 'security', emoji: '🔒', title: 'Security', description: 'Privacy-aware systems and access control.', glow: 'rgba(244,114,182,0.75)' },
  { id: 'mobile', emoji: '📱', title: 'Mobile Ready', description: 'Responsive apps and mobile-first workflows.', glow: 'rgba(251,146,60,0.75)' },
  { id: 'api', emoji: '🧩', title: 'API Ready', description: 'Integration-friendly for later backend wiring.', glow: 'rgba(168,85,247,0.75)' },
  { id: 'support', emoji: '💬', title: 'Support', description: 'Live chat, onboarding, and human guidance.', glow: 'rgba(52,211,153,0.75)' },
];

export const PRODUCTS = {
  scheduling: {
    id: 'scheduling',
    name: 'Sphere Scheduling',
    emoji: '📅',
    accent: 'var(--product-scheduling)',
    accentSoft: 'var(--product-scheduling-soft)',
    cover: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)',
    tagline: 'AI appointment management for modern teams.',
    description:
      'Sphere Scheduling is a next-generation appointment platform with AI conflict resolution, real-time calendar sync, and a refined drag-and-drop booking experience.',
    version: 'v3.2.1',
    versionDate: 'June 8, 2026',
    versionNotes:
      'Improved recurring event handling, fixed timezone edge cases in multi-region bookings, and added Stripe payment integration for paid appointments.',
    features: [
      'AI conflict detection',
      'Google & Outlook sync',
      'Custom booking pages',
      'Team calendar management',
      'SMS & email reminders',
      'Analytics dashboard',
      'API access',
      'HIPAA compliant mode',
    ],
    actions: [
      { label: 'Play Store', variant: 'primary', intent: 'toast', message: 'Opening Play Store…' },
      { label: 'Download EXE', variant: 'ghost', intent: 'toast', message: 'Downloading Sphere Scheduling.exe…' },
      { label: 'Open Web App', variant: 'ghost', intent: 'toast', message: 'Opening web app…' },
      { label: 'Request Demo', variant: 'ghost', intent: 'chat' },
    ],
    shots: [
      'Smart booking flow',
      'Calendar sync',
      'Team workload view',
    ],
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram Copier',
    emoji: '⚡',
    accent: 'var(--product-telegram)',
    accentSoft: 'var(--product-telegram-soft)',
    cover: 'linear-gradient(135deg,#E0F5FC,#BAE6FD)',
    tagline: 'Copy messages between channels with precision.',
    description:
      'The most powerful Telegram signal forwarding tool available. Copy messages between channels, groups, and bots with configurable delays, keyword filters, and transformation rules.',
    version: 'v2.8.0',
    versionDate: 'June 10, 2026',
    versionNotes:
      'Bulk forwarding now supports group chats, with rate limiting controls and performance improvements for larger channel lists.',
    features: [
      'Multi-source forwarding',
      'Keyword & regex filters',
      'Message transformation',
      'Configurable delays',
      'Blacklist / whitelist',
      'Bulk group support',
      'Silent mode',
      'Uptime monitoring',
    ],
    actions: [
      { label: 'Play Store', variant: 'primary', intent: 'toast', message: 'Opening Play Store…' },
      { label: 'Download EXE', variant: 'ghost', intent: 'toast', message: 'Downloading TelegramCopier.exe…' },
      { label: 'Request Demo', variant: 'ghost', intent: 'chat' },
    ],
    shots: [
      'Signal filter engine',
      'Queue and delay panel',
      'Multi-channel forwarder',
    ],
  },
  agri: {
    id: 'agri',
    name: 'Agricultural Suite',
    emoji: '🌿',
    accent: 'var(--product-agri)',
    accentSoft: 'var(--product-agri-soft)',
    cover: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)',
    tagline: 'Precision agriculture powered by AI.',
    description:
      'An AI-powered precision agriculture platform helping farmers monitor crop health, predict yields, manage irrigation, and detect disease outbreaks before they spread.',
    version: 'v1.5.2',
    versionDate: 'June 5, 2026',
    versionNotes:
      'Added cassava and maize disease detection, improved offline sync reliability, and introduced a new heatmap view for field analysis.',
    features: [
      'Crop disease detection AI',
      'Yield prediction models',
      'Smart irrigation alerts',
      'Soil moisture tracking',
      'Weather integration',
      'Satellite field analysis',
      'Multi-farm dashboard',
      'Offline mode for rural areas',
    ],
    actions: [
      { label: 'Play Store', variant: 'primary', intent: 'toast', message: 'Opening Play Store…' },
      { label: 'Open Web App', variant: 'ghost', intent: 'toast', message: 'Opening web app…' },
      { label: 'Request Demo', variant: 'ghost', intent: 'chat' },
    ],
    shots: [
      'Satellite overview',
      'Crop disease scan',
      'Farm analytics',
    ],
  },
  finance: {
    id: 'finance',
    name: 'Finance Management',
    emoji: '💰',
    accent: 'var(--product-finance)',
    accentSoft: 'var(--product-finance-soft)',
    cover: 'linear-gradient(135deg,#F5F3FF,#EDE9FE)',
    tagline: 'Track business and personal money with clarity.',
    description:
      'A comprehensive personal and business finance tracker with automated categorisation, budget forecasting, invoice management, and detailed reports.',
    version: 'v4.0.0',
    versionDate: 'June 12, 2026',
    versionNotes:
      'Major release: rebuilt transaction engine, added AI-powered spending insights, and introduced live multi-currency support.',
    features: [
      'Multi-account aggregation',
      'Automated categorisation',
      'Budget forecasting',
      'Invoice management',
      'Tax preparation exports',
      'Recurring expense tracking',
      'Net worth dashboard',
      'Multi-currency support',
    ],
    actions: [
      { label: 'Play Store', variant: 'primary', intent: 'toast', message: 'Opening Play Store…' },
      { label: 'Download EXE', variant: 'ghost', intent: 'toast', message: 'Downloading FinanceManager.exe…' },
      { label: 'Open Web App', variant: 'ghost', intent: 'toast', message: 'Opening web app…' },
      { label: 'Request Demo', variant: 'ghost', intent: 'chat' },
    ],
    shots: [
      'Cashflow dashboard',
      'Budget planner',
      'Invoice summary',
    ],
  },
};

export const PRODUCT_LIST = Object.values(PRODUCTS);

export const HERO_SCREENS = PRODUCT_LIST.map((product) => ({
  id: product.id,
  title: product.name,
  subtitle: product.tagline,
  accent: product.accent,
  cover: product.cover,
  emoji: product.emoji,
  shots: product.shots,
}));
