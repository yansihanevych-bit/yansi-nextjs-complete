import type { Metadata } from 'next';
import { getMessages } from '@/lib/i18n';
import { LocaleLayoutClient } from './layout-client';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Yansi.IO - Ignite Demand. Close More Deals.',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <LocaleLayoutClient locale={locale} messages={messages}>
      {children}
    </LocaleLayoutClient>
  );
}
