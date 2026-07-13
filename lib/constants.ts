export const SITE_CONFIG = {
  name: 'Yansi.IO',
  description: 'AI-powered marketing & development services',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yan-si.io',
  email: 'hello@yan-si.io',
  phone: '+380682080835',
  telegram: '@yansiio',
  linkedin: 'https://linkedin.com/company/yansi-io',
  twitter: 'https://twitter.com/yansiio',
  
  // Locations
  locations: {
    ukraine: {
      country: 'Ukraine',
      city: 'Kharkiv',
      timezone: 'EET',
    },
  },
  
  // Business hours
  businessHours: {
    start: 9,
    end: 18,
    timezone: 'EET',
    daysOff: [6, 0], // Saturday, Sunday
  },
  
  // API endpoints
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
};

export const SERVICES = [
  {
    id: 'performance-advertising',
    category: 'advertising' as const,
    slug: 'performance-advertising',
  },
  {
    id: 'analytics-data',
    category: 'analytics' as const,
    slug: 'analytics-data',
  },
  {
    id: 'ai-automation',
    category: 'automation' as const,
    slug: 'ai-automation',
  },
  {
    id: 'growth-strategy',
    category: 'development' as const,
    slug: 'growth-strategy',
  },
];

export const ADVERTISING_PLATFORMS = [
  { id: 'google', name: 'Google Ads', slug: 'google-ads' },
  { id: 'meta', name: 'Meta Ads', slug: 'meta-ads' },
  { id: 'bing', name: 'Bing Ads', slug: 'bing-ads' },
  { id: 'tiktok', name: 'TikTok Ads', slug: 'tiktok-ads' },
  { id: 'x', name: 'X Ads', slug: 'x-ads' },
  { id: 'youtube', name: 'YouTube Ads', slug: 'youtube-ads' },
];

export const INDUSTRIES = [
  { id: 'fintech', name: 'Fintech & Blockchain', slug: 'fintech-blockchain' },
  { id: 'saas', name: 'SaaS', slug: 'saas' },
  { id: 'ecommerce', name: 'Retail & E-commerce', slug: 'retail-ecommerce' },
  { id: 'healthcare', name: 'HealthTech & MedTech', slug: 'healthtech-medtech' },
  { id: 'supply-chain', name: 'Supply Chain & Logistics', slug: 'supply-chain-logistics' },
  { id: 'travel', name: 'Travel & Education', slug: 'travel-education' },
  { id: 'specialized', name: 'Specialized Industries', slug: 'specialized-industries' },
];

export const BUDGET_RANGES = [
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1500-2000', label: '$1,500 - $2,000' },
  { value: '2000-5000', label: '$2,000 - $5,000' },
  { value: '5000plus', label: '$5,000+' },
];

export const AVAILABLE_TIMES = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Services', href: '/services' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Cases', href: '/cases' },
  ],
  company: [
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'About', href: '/#about' },
  ],
  legal: [
    { label: 'Policies', href: '/policies' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export const METADATA = {
  defaultTitle: 'Yansi.IO — Ignite Demand. Close More Deals.',
  defaultDescription:
    'AI-powered marketing and development services. Performance advertising, analytics, automation, and growth strategy for SaaS, fintech, e-commerce, and more.',
  defaultKeywords: [
    'AI marketing',
    'performance advertising',
    'Google Ads',
    'Meta Ads',
    'SaaS marketing',
    'fintech marketing',
    'ecommerce marketing',
    'growth strategy',
  ],
  ogImage: '/og-image.jpg',
  twitterHandle: '@yansiio',
};

export const ANIMATION_CONFIG = {
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  
  fadeInScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
};
