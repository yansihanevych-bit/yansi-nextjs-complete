import { notFound } from 'next/navigation';

// ✅ ЕДИНСТВЕННЫЙ ИСТОЧНИК ИСТИНЫ ДЛЯ ЛОКАЛИЗАЦИИ
export const locales = ['en', 'uk', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames = {
  en: 'English',
  uk: 'Українська',
  ru: 'Русский',
};

// ✅ Утилиты
export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export function isValidLocale(locale: any): locale is Locale {
  return locales.includes(locale);
}
