import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';

// ✅ ИСПОЛЬЗУЕМ locales из lib/i18n (единственный источник истины)
export default getRequestConfig(async ({ locale }) => {
  // Валидация локали
  if (!locales.includes(locale as any)) {
    notFound();
  }

  try {
    // Загружаем переводы
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }
});
