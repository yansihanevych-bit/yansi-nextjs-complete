import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, isValidLocale} from '@/lib/i18n';

export default getRequestConfig(async ({locale}) => {
  const currentLocale = isValidLocale(locale) ? locale : defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
});
