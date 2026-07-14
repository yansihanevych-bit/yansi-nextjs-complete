import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'uk', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames = {
  en: 'English',
  uk: 'Українська',
  ru: 'Русский',
};

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

// Export next-intl config
export default getRequestConfig(async ({ locale }) => {
  if (!isValidLocale(locale)) notFound();
  return {
    messages: await getMessages(locale),
  };
});
