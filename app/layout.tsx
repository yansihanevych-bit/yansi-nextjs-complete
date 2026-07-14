import type { Metadata } from 'next';
import { generateOrganizationSchema, SITE_URL } from '@/lib/seo';
import { METADATA } from '@/lib/constants';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: METADATA.defaultTitle,
  description: METADATA.defaultDescription,
  keywords: METADATA.defaultKeywords,
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: METADATA.defaultTitle,
    description: METADATA.defaultDescription,
    siteName: 'Yansi.IO',
    images: [
      {
        url: METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: METADATA.defaultTitle,
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['uk_UA', 'ru_RU'],
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA.defaultTitle,
    description: METADATA.defaultDescription,
    creator: METADATA.twitterHandle,
    images: [METADATA.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  themeColor: '#FF8A00',
  authors: [
    {
      name: 'Yansi.IO',
      url: SITE_URL,
    },
  ],
  creator: 'Yansi.IO',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: RootLayoutProps) {
  const locale = 'en'; // Default locale for root layout

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Yansi" />
        <meta name="application-name" content="Yansi.IO" />
        <meta name="msapplication-TileColor" content="#FF8A00" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://api.telegram.org" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://api.telegram.org" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Unbounded:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#FF8A00" />

        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Yansi Blog" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTAG_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
                `,
              }}
            />
          </>
        )}
      </head>

      <body className="bg-yansi-bg text-yansi-text overflow-x-hidden antialiased">
        
          {children}
        
      </body>
    </html>
  );
}
