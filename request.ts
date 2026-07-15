import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {locales, defaultLocale} from '@/lib/i18n';

export default getRequestConfig(async ({locale}) => {
  const currentLocale = hasLocale(locales, locale)
    ? locale
    : defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
});
