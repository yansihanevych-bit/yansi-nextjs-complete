import { Metadata } from 'next';
import { METADATA, SITE_CONFIG } from '@/lib/constants';
import type { SEOMetadata } from '@/types';

export function generateMetadata(seo: SEOMetadata): Metadata {
  return {
    title: seo.title || METADATA.defaultTitle,
    description: seo.description || METADATA.defaultDescription,
    keywords: seo.keywords || METADATA.defaultKeywords,
    robots: seo.robots || (seo.noindex ? 'noindex' : seo.nofollow ? 'nofollow' : 'index, follow'),
    openGraph: {
      title: seo.title || METADATA.defaultTitle,
      description: seo.description || METADATA.defaultDescription,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: seo.ogImage
        ? [
            {
              url: seo.ogImage,
              width: 1200,
              height: 630,
              alt: seo.title || METADATA.defaultTitle,
            },
          ]
        : undefined,
      type: (seo.ogType as 'website' | 'article' | 'profile') || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title || METADATA.defaultTitle,
      description: seo.description || METADATA.defaultDescription,
      images: seo.ogImage ? [seo.ogImage] : undefined,
      creator: METADATA.twitterHandle,
    },
  };
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  canonical?: string;
  robots?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * SEO компонент для управления мета-тегами страницы
 * Используется вместе с generateMetadata() для Next.js Metadata API
 *
 * @example
 * export const metadata = generateMetadata({
 *   title: 'Page Title',
 *   description: 'Page description',
 *   keywords: ['keyword1', 'keyword2'],
 * });
 */
export const SEO = (props: SEOProps) => generateMetadata(props);

// Вспомогательные функции для генерации SEO данных

export function generateServiceSEO(
  serviceName: string,
  description: string,
  category: string
): SEOMetadata {
  return {
    title: `${serviceName} | Yansi.IO`,
    description: description.substring(0, 160),
    keywords: [
      serviceName,
      category,
      'marketing services',
      'AI services',
      'growth strategy',
    ],
    ogType: 'article',
  };
}

export function generateCaseSEO(
  caseName: string,
  description: string,
  company: string
): SEOMetadata {
  return {
    title: `${caseName} Case Study | Yansi.IO`,
    description: `Case study: ${description.substring(0, 140)}`,
    keywords: [caseName, company, 'case study', 'results', 'success story'],
    ogType: 'article',
  };
}

export function generateBlogSEO(
  title: string,
  excerpt: string,
  author: string,
  category: string
): SEOMetadata {
  return {
    title: `${title} | Yansi.IO Blog`,
    description: excerpt.substring(0, 160),
    keywords: [title, category, author, 'blog', 'insights'],
    ogType: 'article',
  };
}

export default SEO;
