'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface LocaleLayoutClientProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}

export function LocaleLayoutClient({
  children,
  locale,
  messages,
}: LocaleLayoutClientProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </>
    </NextIntlClientProvider>
  );
}
