import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/common';
import { AffiliateModal } from '@/components/overlay/AffiliateModal.jsx';
import { ProductModal } from '@/components/overlay/ProductModal.jsx';
import { Home } from '@/pages/Home/Home.jsx';
import { PRODUCTS } from '@/data/products';
import { CHAT_QUICK_REPLIES, CHAT_WELCOME, getBotReply } from '@/utils/chat';
import { TOAST_EVENT, notify, scrollToId } from '@/utils/helpers';
import { ToastStack } from '@/components/common/ToastStack.jsx';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTheme } from '@/hooks/useTheme';

const productNav = [
  { id: 'scheduling', label: 'Sphere Scheduling', short: 'AI booking and sync' },
  { id: 'telegram', label: 'Telegram Copier', short: 'Forwarding automation' },
  { id: 'agri', label: 'Agricultural Suite', short: 'Farm intelligence' },
  { id: 'finance', label: 'Finance Management', short: 'Money tracking' },
];

function Header({ resolvedTheme, toggleTheme, mobileMenuOpen, setMobileMenuOpen, onOpenProduct, onOpenChat }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-[color:var(--surface)] backdrop-blur-xl dark:border-slate-800/60">
      <div className="section-shell mx-auto flex h-20 max-w-7xl items-center justify-between gap-4">
        <button type="button" onClick={() => scrollToId('hero')} className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-indigo-500 font-display text-lg font-extrabold text-white shadow-lg shadow-cyan-500/20">
            S
          </div>
          <div className="text-left">
            <div className="font-display text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">
              Sphere Software
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Solutions for every sphere</div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          <button type="button" onClick={() => scrollToId('hero')} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
            Home
          </button>
          <div className="group relative">
            <button type="button" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
              Products ▾
            </button>
            <div className="invisible absolute left-0 top-full mt-3 w-[330px] translate-y-2 rounded-3xl border border-slate-200 bg-[var(--surface-alt)] p-3 opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-950">
              <div className="grid gap-2">
                {productNav.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenProduct(item.id)}
                    className="flex items-start gap-3 rounded-2xl p-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <div className="mt-1 h-3 w-3 rounded-full bg-cyan-500" />
                    <div>
                      <div className="font-semibold text-slate-950 dark:text-white">{item.label}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{item.short}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {['whatsnew', 'commission', 'contact'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToId(id)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {id === 'whatsnew' ? "What&apos;s New" : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="relative flex h-11 items-center rounded-full border border-slate-200 bg-white px-2 dark:border-slate-700 dark:bg-slate-900"
            aria-label="Toggle theme"
          >
            <span className={`grid h-8 w-8 place-items-center rounded-full transition ${resolvedTheme === 'dark' ? 'translate-x-9 bg-slate-700 text-yellow-300' : 'bg-amber-400 text-slate-950'}`}>
              {resolvedTheme === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>
          <Button variant="accent" size="md" className="rounded-full" onClick={onOpenChat}>
            Get in touch
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-white lg:hidden"
          aria-label="Toggle menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose, onOpenProduct, onOpenChat, resolvedTheme, toggleTheme }) {
  return (
    <div className={`fixed inset-x-0 top-20 z-40 border-b border-slate-200/80 bg-[var(--surface)] backdrop-blur-xl transition-all duration-300 lg:hidden ${open ? 'translate-y-0 opacity-100' : '-translate-y-4 pointer-events-none opacity-0'}`}>
      <div className="section-shell mx-auto max-w-7xl py-4">
        <div className="grid gap-2">
          <button type="button" onClick={() => { scrollToId('hero'); onClose(); }} className="rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Home</button>
          {productNav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onOpenProduct(item.id);
                onClose();
              }}
              className="rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {item.label}
            </button>
          ))}
          <button type="button" onClick={() => { scrollToId('whatsnew'); onClose(); }} className="rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">What&apos;s New</button>
          <button type="button" onClick={() => { scrollToId('commission'); onClose(); }} className="rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Commission</button>
          <button type="button" onClick={() => { scrollToId('contact'); onClose(); }} className="rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Contact</button>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div className="text-sm font-semibold text-slate-950 dark:text-white">Dark Mode</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{resolvedTheme === 'dark' ? 'Enabled' : 'Light'}</div>
          </div>
          <button type="button" onClick={toggleTheme} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold dark:border-slate-700">
            Toggle
          </button>
        </div>

        <Button variant="accent" size="lg" className="mt-4 w-full rounded-full" onClick={onOpenChat}>
          Get in touch
        </Button>
      </div>
    </div>
  );
}

function ChatWidget({ open, started, unread, messages, quickReplies, onToggle, onClose, onStart, onSend, form, setForm, input, setInput }) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-[70] grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-indigo-500 text-2xl text-white shadow-[0_20px_60px_rgba(20,184,166,0.35)]"
      >
        💬
        {unread > 0 && !open ? (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
            {unread}
          </span>
        ) : null}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-[70] w-[min(100vw-1.5rem,390px)] overflow-hidden rounded-[28px] border border-slate-200 bg-[var(--surface-alt)] shadow-[0_30px_100px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div>
            <div className="font-display text-lg font-extrabold text-slate-950 dark:text-white">Sphere Chat</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">We usually reply within 2 hours</div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold dark:border-slate-700">
            ✕
          </button>
        </div>

        {!started ? (
          <div className="grid gap-4 p-5">
            <div className="rounded-3xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              Start a chat to ask about products, support, pricing, or commission. This flow is structured for future backend integration.
            </div>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Your name</span>
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email address</span>
              <input
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                type="email"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
                placeholder="you@example.com"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Product of interest</span>
              <select
                value={form.product}
                onChange={(event) => setForm((current) => ({ ...current, product: event.target.value }))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
              >
                <option value="">Choose a product…</option>
                <option>Sphere Scheduling</option>
                <option>Telegram Copier</option>
                <option>Agricultural Suite</option>
                <option>Finance Management</option>
                <option>Commission / Partnership</option>
                <option>General Question</option>
              </select>
            </label>
            <Button variant="accent" size="lg" className="w-full rounded-full" onClick={onStart}>
              Start Chat →
            </Button>
          </div>
        ) : (
          <div className="flex h-[500px] flex-col">
            <div className="chat-scroll flex-1 space-y-3 overflow-y-auto p-5">
              {messages.map((message) => (
                <div key={message.id} className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-7 ${message.role === 'user' ? 'ml-auto bg-cyan-500 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}>
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => onSend(reply)}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') onSend();
                  }}
                  className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
                  placeholder="Type a message…"
                />
                <Button variant="accent" size="md" className="rounded-full px-4" onClick={() => onSend()}>
                  ➤
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"]';

    const handleMove = (event) => {
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });
      setActive(Boolean(event.target.closest?.(interactiveSelector)));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className={`${visible ? 'cursor-visible' : ''} ${active ? 'cursor-active' : ''} pointer-events-none hidden xl:block`}>
      <div className="cursor-ring" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} />
      <div className="cursor-dot" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} />
    </div>
  );
}

export default function App() {
  const { resolvedTheme, toggleTheme } = useTheme();
  useScrollReveal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productKey, setProductKey] = useState('scheduling');
  const [affiliateOpen, setAffiliateOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUnread, setChatUnread] = useState(1);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(CHAT_WELCOME);
  const [chatForm, setChatForm] = useState({ name: '', email: '', product: '' });
  const [toasts, setToasts] = useState([]);

  const activeProduct = useMemo(() => PRODUCTS[productKey], [productKey]);

  useEffect(() => {
    const handleToast = (event) => {
      const payload = event.detail || {};
      const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current, { id, message: payload.message, variant: payload.variant || 'info' }]);
      window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3600);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const openProduct = (id) => {
    setProductKey(id);
    setAffiliateOpen(false);
    setChatOpen(false);
  };

  const openChat = () => {
    setChatOpen(true);
    setChatUnread(0);
    closeMobileMenu();
  };

  const closeChat = () => setChatOpen(false);

  const startChat = () => {
    if (!chatForm.name.trim() || !chatForm.email.trim()) {
      notify('Please add your name and email first.', 'warning');
      return;
    }

    setChatStarted(true);
    setChatMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID?.() || `${Date.now()}-intro`,
        role: 'bot',
        text: `Hi ${chatForm.name.trim()}! 👋 Welcome to Sphere Software. I see you’re interested in ${chatForm.product || 'our products'}. How can I help you today?`,
      },
    ]);
  };

  const sendChatMessage = (messageOverride) => {
    const text = (messageOverride ?? chatInput).trim();
    if (!text) return;

    const userMessage = { id: crypto.randomUUID?.() || `${Date.now()}-user`, role: 'user', text };
    const botMessage = {
      id: crypto.randomUUID?.() || `${Date.now()}-bot`,
      role: 'bot',
      text: getBotReply(text),
    };

    setChatMessages((current) => [...current, userMessage]);
    setChatInput('');

    window.setTimeout(() => {
      setChatMessages((current) => [...current, botMessage]);
      if (!chatOpen) setChatUnread(1);
    }, 450);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--ink)]">
      <Header
        resolvedTheme={resolvedTheme}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenProduct={openProduct}
        onOpenChat={openChat}
      />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        onOpenProduct={openProduct}
        onOpenChat={openChat}
        resolvedTheme={resolvedTheme}
        toggleTheme={toggleTheme}
      />

      <Home onOpenProduct={openProduct} onOpenAffiliate={() => setAffiliateOpen(true)} onOpenChat={openChat} />

      <ProductModal
        open={Boolean(activeProduct)}
        product={activeProduct}
        onClose={() => setProductKey('')}
        onOpenChat={openChat}
      />

      <AffiliateModal open={affiliateOpen} onClose={() => setAffiliateOpen(false)} />

      <ChatWidget
        open={chatOpen}
        started={chatStarted}
        unread={chatUnread}
        messages={chatMessages}
        quickReplies={CHAT_QUICK_REPLIES}
        onToggle={() => (chatOpen ? closeChat() : openChat())}
        onClose={closeChat}
        onStart={startChat}
        onSend={sendChatMessage}
        form={chatForm}
        setForm={setChatForm}
        input={chatInput}
        setInput={setChatInput}
      />

      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((current) => current.filter((toast) => toast.id !== id))} />
      <Cursor />
    </div>
  );
}
