import type { Metadata } from 'next';
import { getMessages } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: LocaleLayoutProps): Promise<Metadata> {
  return {
    title: 'Yansi.IO — Ignite Demand. Close More Deals.',
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const messages = await getMessages(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
