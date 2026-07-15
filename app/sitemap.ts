import type { MetadataRoute } from 'next';

const SITE_URL = 'https://yan-si.io';
const locales = ['en', 'uk', 'ru'];

const routes = [
  '',
  '/about',
  '/team',
  '/blog',
  '/cases',
  '/contact',
  '/policies',
  '/services',
  '/services/google-ads',
  '/services/meta-ads',
  '/services/seo',
  '/services/email-marketing',
  '/services/content-marketing',
  '/services/ai-development',
  '/services/bing-ads',
  '/services/blockchain-development',
  '/services/custom-ai-agents',
  '/services/google-shopping',
  '/services/performance-advertising',
  '/services/tiktok-ads',
  '/services/web-development',
  '/services/x-ads',
  '/services/youtube-ads',
  '/solutions/saas',
  '/solutions/fintech',
  '/solutions/ecommerce',
  '/solutions/healthtech',
  '/solutions/travel-education',
  '/platforms/shopify',
  '/platforms/wordpress',
  '/platforms/magento',
  '/platforms/opencart',
  '/platforms/nft-marketplace',
  '/industries/specialized',
  '/industries/supply-chain',
  '/ai-agents/osint',
  '/guides/choose-marketing',
  '/guides/google-ads-generator',
  '/tools/calculator',
  '/tools/utm-generator',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = locale === 'en' 
        ? `${SITE_URL}${route}`
        : `${SITE_URL}/${locale}${route}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
