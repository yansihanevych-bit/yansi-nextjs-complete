export type Locale = 'en' | 'uk' | 'ru';

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  featured?: boolean;
  category: 'advertising' | 'development' | 'analytics' | 'automation';
}

export interface Case {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  results: string[];
  testimonial?: {
    text: string;
    author: string;
    company: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  category: string;
  publishedAt: Date;
  updatedAt?: Date;
  readingTime: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  telegram?: string;
  message: string;
  budget?: string;
  files?: File[];
}

export interface BookCallFormData {
  name: string;
  email: string;
  phone: string;
  selectedDate: string;
  selectedTime: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  children?: NavigationLink[];
}

export interface SEOMetadata {
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
