/**
 * Site Configuration
 * Центральная конфигурация сайта и метаданные
 */

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

// Default metadata
export const METADATA = {
  defaultTitle: 'Yansi.IO - Ignite Demand. Close More Deals.',
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

// Animation configuration
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
