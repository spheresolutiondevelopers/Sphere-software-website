export const CHAT_QUICK_REPLIES = ['Pricing', 'Commission', 'Support'];

export const CHAT_WELCOME = [
  {
    id: 'welcome',
    role: 'bot',
    text: 'Hi there 👋 Welcome to Sphere Software. Tell me what you need and I’ll point you in the right direction.',
  },
];

export function getBotReply(message) {
  const text = message.toLowerCase();

  if (text.includes('commission') || text.includes('affiliate') || text.includes('earn')) {
    return 'We offer recurring commission for the first year. You can open the Commission section for the full rate table, or tap “Become an Affiliate”.';
  }

  if (text.includes('support') || text.includes('help') || text.includes('issue') || text.includes('bug')) {
    return 'Thanks — please describe the issue in a bit more detail and we’ll route it to the right team. You can also email spheresolutiondevelopers@gmail.com.';
  }

  if (text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('plan')) {
    return 'Each product has flexible pricing tiers with monthly and annual options. Open any product card to see the latest release details.';
  }

  if (text.includes('download') || text.includes('app') || text.includes('play store')) {
    return 'You can explore the product cards above for download and launch actions. I can also help you choose the right tool for your workflow.';
  }

  return 'Got it. A team member will follow up shortly. If you want, I can also show you product details, commission info, or support options.';
}
