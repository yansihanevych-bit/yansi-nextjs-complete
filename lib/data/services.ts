/**
 * Services Data
 * Информация об услугах и платформах рекламы
 */

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
