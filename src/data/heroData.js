// src/data/heroData.js

export const HERO_SUBTITLES = [
  'Our products include Sphere Scheduling, Telegram Copier, Agricultural Suite & Finance Management.',
  'Follow us on social media for the latest updates, product drops, and insider news.',
  'Rate our products on the Play Store — your feedback shapes everything we build next.',
  'Join our affiliate programme and earn up to 25% recurring commission per referral.',
  'Trusted by 24,000+ active users across 40+ countries — and growing every day.',
];

export const HERO_STATS = [
  { value: '24K+', label: 'Active Users' },
  { value: '9', label: 'Products' },
  { value: '99.9%', label: 'Uptime' },
];

export const HERO_SCREENSHOTS = [
  {
    id: 'slide1',
    cards: [
      {
        title: 'Sphere Schedule',
        tag: 'Mobile',
        emoji: '📅',
        color: 'rgba(124,108,248,0.15)',
        month: 'June 2026',
        slots: [
          { label: '09:00 · Sarah Mitchell', type: 'on' },
          { label: '', type: 'off' },
          { label: '11:30 · Team Standup', type: 'on', class: 'c2' },
          { label: '13:00 · Client Review', type: 'on' },
          { label: '15:30 · Product Demo', type: 'on', class: 'c3' },
          { label: '17:00 · Sprint Close', type: 'on', class: 'c2' },
        ],
        metrics: [
          { value: '28', label: 'Booked', color: '#7C6CF8' },
          { value: '98%', label: 'Fill Rate', color: '#4ECDC4' },
          { value: '4', label: 'Pending', color: '#FF8A80' },
        ],
      },
      {
        title: 'NEXUS Trading',
        tag: 'Desktop',
        emoji: '📈',
        color: 'rgba(78,205,196,0.15)',
        chart: {
          path: 'M0,46 C15,38 30,40 50,28 S80,10 110,16 S150,4 175,3 S200,8 220,6 L220,52 L0,52Z',
          gradientId: 'cg1',
          gradientColors: ['rgba(78,205,196,0.35)', 'rgba(78,205,196,0)'],
          line: 'M0,46 C15,38 30,40 50,28 S80,10 110,16 S150,4 175,3 S200,8 220,6',
          lineColor: 'rgba(78,205,196,0.9)',
          dot: { cx: 220, cy: 6, fill: '#4ECDC4' },
        },
        pairs: [
          { name: 'BTC/USDT', price: '64,230.50', change: '+2.4%', changeClass: 'pos' },
          { name: 'ETH/USDT', price: '3,412.80', change: '-0.8%', changeClass: 'neg' },
          { name: 'XAU/USD', price: '2,318.60', change: '+1.1%', changeClass: 'pos' },
        ],
        sig: '● Signal copied · XAUUSD BUY @ 2318.60',
      },
    ],
  },
  {
    id: 'slide2',
    cards: [
      {
        title: 'Agri Suite',
        tag: 'Mobile',
        emoji: '🌿',
        color: 'rgba(16,185,129,0.15)',
        month: 'Field Status',
        slots: [
          { label: '🌾 Wheat Block A — Healthy 95%', type: 'on', class: 'c2' },
          { label: '🌽 Corn Block B — Alert 78%', type: 'on', class: 'c3' },
          { label: '🍅 Tomatoes C — Healthy 91%', type: 'on', class: 'c2' },
          { label: '', type: 'off' },
          { label: '💧 Irrigate Block B — AI Advisory', type: 'on', style: { background: 'rgba(16,185,129,0.1)', color: '#34D399', borderLeftColor: '#10B981' } },
        ],
        metrics: [
          { value: '2.4t', label: 'Yield/ha', color: '#10B981' },
          { value: '+12%', label: 'vs Last', color: '#4ECDC4' },
          { value: '1', label: 'Alert', color: '#FF8A80' },
        ],
      },
      {
        title: 'Finance Mgmt',
        tag: 'Desktop',
        emoji: '💰',
        color: 'rgba(139,92,246,0.15)',
        chart: {
          path: 'M0,40 L40,35 L80,28 L120,20 L160,14 L200,8 L220,5 L220,52 L0,52Z',
          gradientId: 'cg2',
          gradientColors: ['rgba(139,92,246,0.35)', 'rgba(139,92,246,0)'],
          line: 'M0,40 L40,35 L80,28 L120,20 L160,14 L200,8 L220,5',
          lineColor: 'rgba(139,92,246,0.9)',
        },
        pairs: [
          { name: 'Revenue', price: '$128,400', change: '+8.2%', changeClass: 'pos' },
          { name: 'Expenses', price: '$74,200', change: '-3.1%', changeClass: 'neg' },
          { name: 'Net Profit', price: '$54,200', change: '+18.4%', changeClass: 'pos' },
        ],
        sig: '● Budget 94% on track · Q2 report ready',
        sigStyle: { borderColor: 'rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.07)', color: 'rgba(167,139,250,0.9)' },
      },
    ],
  },
  {
    id: 'slide3',
    cards: [
      {
        title: 'Sphere POS',
        tag: 'Desktop',
        emoji: '🏪',
        color: 'rgba(52,211,153,0.15)',
        month: "Today's Sales",
        slots: [
          { label: 'Burger Combo × 12 — KES 10,200', type: 'on', class: 'c2' },
          { label: 'Chicken Wings × 8 — KES 9,600', type: 'on' },
          { label: 'Fresh Juice × 24 — KES 4,800', type: 'on', class: 'c2' },
          { label: 'Returned: Pasta × 1 — KES 850', type: 'on', class: 'c3' },
          { label: '', type: 'off' },
        ],
        metrics: [
          { value: '84.3K', label: 'Revenue', color: '#34D399' },
          { value: '247', label: 'Txns', color: '#4ECDC4' },
          { value: 'KES 341', label: 'Avg', color: '#7C6CF8' },
        ],
      },
      {
        title: 'Sphere AI Agents',
        tag: 'Desktop',
        emoji: '🤖',
        color: 'rgba(244,114,182,0.15)',
        month: 'Active Agents',
        slots: [
          { label: '● ARIA Voice Agent', type: 'on', class: 'c2', extra: { right: 'Running' } },
          { label: '● AFYA Health Bot', type: 'on', class: 'c2', extra: { right: 'Running' } },
          { label: '● DocuBot Pro', type: 'on', extra: { right: 'Idle', style: { background: 'rgba(244,114,182,0.1)', color: '#F9A8D4', borderLeftColor: '#EC4899' } } },
          { label: '', type: 'off' },
          { label: '⚠ ScheduleBot', type: 'on', class: 'c3', extra: { right: 'Error' } },
        ],
        metrics: [
          { value: '1,240', label: 'Sessions', color: '#F9A8D4' },
          { value: '3', label: 'Running', color: '#4ECDC4' },
          { value: '1', label: 'Error', color: '#FF8A80' },
        ],
      },
    ],
  },
];

export const ORBITAL_NODES = [
  { id: 'farming', emoji: '🌿', title: 'Farming Suite', desc: 'AI crop disease detection, yield prediction & smart irrigation.', color: 'rgba(45,212,160,0.75)', bg: 'radial-gradient(circle at 35% 30%, #4aefc0, #1a9e78)', size: 50 },
  { id: 'scheduling', emoji: '📅', title: 'Scheduling', desc: 'AI appointment booking with smart conflict resolution & real-time calendar sync.', color: 'rgba(124,108,248,0.75)', bg: 'radial-gradient(circle at 35% 30%, #9B8DFA, #5E4FF0)', size: 54 },
  { id: 'trading', emoji: '📈', title: 'Trading', desc: 'Signal copying with smart filtering, delay control & broker bridge integration.', color: 'rgba(255,107,138,0.75)', bg: 'radial-gradient(circle at 35% 30%, #ff8fab, #cc2244)', size: 50 },
  { id: 'finance', emoji: '💰', title: 'Finance Mgmt', desc: 'Personal & business finance tracking with automated reports & budget forecasting.', color: 'rgba(255,200,80,0.75)', bg: 'radial-gradient(circle at 35% 30%, #ffe066, #cc8800)', size: 48 },
  { id: 'wbs', emoji: '🗂️', title: 'WBS Manager', desc: 'Work breakdown structure tool for project planning, milestones & team coordination.', color: 'rgba(34,211,238,0.75)', bg: 'radial-gradient(circle at 35% 30%, #5ee8f8, #0088aa)', size: 52 },
  { id: 'ai', emoji: '🤖', title: 'AI Agents', desc: 'Adaptive intelligence agents for real-time automation & decision support.', color: 'rgba(244,114,182,0.75)', bg: 'radial-gradient(circle at 35% 30%, #f9a8d4, #be185d)', size: 50 },
  { id: 'energy', emoji: '⚡', title: 'Energy Suite', desc: 'Energy consumption monitoring, smart grid optimisation & renewable asset mgmt.', color: 'rgba(251,146,60,0.75)', bg: 'radial-gradient(circle at 35% 30%, #fdba74, #c2410c)', size: 48 },
  { id: 'games', emoji: '🎮', title: 'Games & Sim', desc: 'Transport simulation engine, game mechanics & interactive scenario dev tools.', color: 'rgba(168,85,247,0.75)', bg: 'radial-gradient(circle at 35% 30%, #c084fc, #7e22ce)', size: 52 },
  { id: 'pos', emoji: '🏪', title: 'POS System', desc: 'Smart point-of-sale with inventory management, analytics & multi-terminal support.', color: 'rgba(52,211,153,0.75)', bg: 'radial-gradient(circle at 35% 30%, #6ee7b7, #065f46)', size: 50 },
];