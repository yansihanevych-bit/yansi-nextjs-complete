/**
 * SEO Utilities
 * Центральное управление SEO метаданными и Schema.org
 */

import { Metadata } from 'next';

export const SITE_NAME = 'Yansi.IO';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yan-si.io';
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'uk', 'ru'] as const;

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterImage?: string;
  keywords?: string[];
  robots?: string;
  alternates?: Record<string, string>;
}

/**
 * Генерирует полный URL
 */
export function getFullUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Генерирует метаданные для страницы
 */
export function generateMetadata(seo: SEOMetadata, locale?: string): Metadata {
  const currentLocale = locale || DEFAULT_LOCALE;
  const canonicalUrl = seo.canonical || getFullUrl('/');
  const ogImage = seo.ogImage || getFullUrl('/og-image.png');
  const twitterImage = seo.twitterImage || ogImage;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots || 'index, follow',
    canonical: canonicalUrl,
    
    // OpenGraph
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      type: seo.ogType || 'website',
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: getLocaleForOpenGraph(currentLocale),
      alternateLocale: SUPPORTED_LOCALES
        .filter((l) => l !== currentLocale)
        .map(getLocaleForOpenGraph),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
          type: 'image/png',
        },
      ],
    },

    // Twitter
    twitter: {
      card: seo.twitterCard || 'summary_large_image',
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: [twitterImage],
      creator: '@yansi_io',
      site: '@yansi_io',
    },

    // Alternates для мультиязычности
    alternates: seo.alternates
      ? {
          languages: Object.fromEntries(
            Object.entries(seo.alternates).map(([lang, url]) => [
              getLocaleForOpenGraph(lang),
              url,
            ])
          ),
          canonical: canonicalUrl,
        }
      : {
          canonical: canonicalUrl,
        },

    // Viewport
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },

    // Другие
    charset: {
      charset: 'UTF-8',
    },
    authors: [
      {
        name: SITE_NAME,
        url: SITE_URL,
      },
    ],
  };
}

/**
 * Конвертирует locale в OpenGraph формат (en_US, uk_UA и т.д.)
 */
export function getLocaleForOpenGraph(locale: string): string {
  const localeMap: Record<string, string> = {
    en: 'en_US',
    uk: 'uk_UA',
    ru: 'ru_RU',
  };
  return localeMap[locale] || 'en_US';
}

/**
 * Генерирует JSON-LD Schema.org
 */
export function generateJsonLd(
  schema: Record<string, any>
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    ...schema,
  };
}

/**
 * Schema: Organization
 */
export function generateOrganizationSchema(): Record<string, any> {
  return generateJsonLd({
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: getFullUrl('/logo.png'),
    description:
      'AI-powered marketing and development services for ambitious companies',
    sameAs: [
      'https://twitter.com/yansi_io',
      'https://linkedin.com/company/yansi-io',
      'https://facebook.com/yansi.io',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@yan-si.io',
      telephone: '+380501234567',
    },
  });
}

/**
 * Schema: WebPage
 */
export function generateWebPageSchema(
  title: string,
  description: string,
  path: string,
  datePublished?: Date,
  dateModified?: Date
): Record<string, any> {
  return generateJsonLd({
    '@type': 'WebPage',
    name: title,
    description: description,
    url: getFullUrl(path),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: datePublished?.toISOString(),
    dateModified: dateModified?.toISOString(),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  });
}

/**
 * Schema: BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): Record<string, any> {
  return generateJsonLd({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getFullUrl(item.url),
    })),
  });
}

/**
 * Schema: LocalBusiness
 */
export function generateLocalBusinessSchema(): Record<string, any> {
  return generateJsonLd({
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    image: getFullUrl('/logo.png'),
    description:
      'AI-powered marketing and development services for ambitious companies',
    url: SITE_URL,
    telephone: '+380501234567',
    email: 'hello@yan-si.io',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kharkiv, Ukraine',
      addressLocality: 'Kharkiv',
      addressCountry: 'UA',
    },
  });
}

/**
 * Schema: Service
 */
export function generateServiceSchema(
  name: string,
  description: string
): Record<string, any> {
  return generateJsonLd({
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  });
}

/**
 * Генерирует Breadcrumbs React компонент
 */
export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function generateBreadcrumbItems(path: string, t: any): BreadcrumbItem[] {
  const segments = path.split('/').filter((s) => s && !['en', 'uk', 'ru'].includes(s));

  if (segments.length === 0) {
    return [{ name: t('breadcrumb.home'), href: '/' }];
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { name: t('breadcrumb.home'), href: '/' },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    const name = t(`breadcrumb.${segment}`, segment.charAt(0).toUpperCase() + segment.slice(1));

    breadcrumbs.push({
      name,
      href: isLast ? undefined : currentPath,
    });
  });

  return breadcrumbs;
}

export default {
  generateMetadata,
  generateJsonLd,
  generateOrganizationSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbItems,
  getFullUrl,
  getLocaleForOpenGraph,
};
