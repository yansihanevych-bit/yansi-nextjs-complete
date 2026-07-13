/**
 * useContactFormData Hook
 * Захватывает все необходимые данные для отправки контактной формы
 */

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export interface ContactFormMetadata {
  pageName?: string;
  pageUrl?: string;
  language?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  company?: string;
}

/**
 * Парсит UTM параметры из URL
 */
function parseUTMParams(url: string): Record<string, string | undefined> {
  const params = new URLSearchParams(new URL(url).search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_term: params.get('utm_term') || undefined,
    gclid: params.get('gclid') || undefined,
    fbclid: params.get('fbclid') || undefined,
  };
}

/**
 * Получает название страницы из pathname
 */
function getPageName(pathname: string): string {
  // Убираем locale из пути
  const parts = pathname.split('/').filter(p => p && !['en', 'uk', 'ru'].includes(p));
  
  if (parts.length === 0) return 'Home';
  
  const pageName = parts[0]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return pageName || 'Home';
}

/**
 * Хук для захвата данных контактной формы
 */
export function useContactFormData(): ContactFormMetadata {
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<ContactFormMetadata>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ✅ Получаем URL и параметры
    const currentUrl = window.location.href;
    const utmParams = parseUTMParams(currentUrl);

    // ✅ Получаем language из pathname
    const language = pathname.split('/')[1] || 'en';

    // ✅ Получаем referrer
    const referrer = document.referrer || undefined;

    // ✅ Получаем название и URL страницы
    const pageName = getPageName(pathname);
    const pageUrl = currentUrl;

    // ✅ Проверяем localStorage для company (если была заполнена)
    const savedCompany = typeof window !== 'undefined' 
      ? localStorage.getItem('contact_company') 
      : undefined;

    setMetadata({
      ...utmParams,
      pageName,
      pageUrl,
      language: ['en', 'uk', 'ru'].includes(language) ? language : 'en',
      referrer,
      company: savedCompany || undefined,
    });
  }, [pathname]);

  return metadata;
}

/**
 * Хук для захвата данных из query параметров (для пиксельных ссылок)
 */
export function useQueryParams() {
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const allParams: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      allParams[key] = value;
    });

    setParams(allParams);
  }, []);

  return params;
}

/**
 * Сохраняет компанию в localStorage для использования в формах
 */
export function saveCompanyToStorage(company: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('contact_company', company);
  }
}

/**
 * Очищает сохраненные данные
 */
export function clearStoredContactData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('contact_company');
  }
}

export default useContactFormData;
