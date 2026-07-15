import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {locales} from '@/lib/i18n';

export default getRequestConfig(async ({locale}) => {
  if (!hasLocale(locales, locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
