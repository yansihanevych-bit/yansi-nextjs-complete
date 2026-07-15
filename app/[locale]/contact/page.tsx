import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, getFullUrl } from '@/lib/seo';
import ContactPageContent from './contact-content';

// ✅ SEO METADATA (Server Component only)
export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us - Yansi.IO',
  description: 'Get in touch with our team. Schedule a consultation and let\'s discuss how we can help your business grow.',
  ogImage: getFullUrl('/og-contact.png'),
  keywords: ['contact', 'consultation', 'get in touch'],
});

// ✅ Server Component - renders metadata and client component
export default function ContactPage() {
  return <ContactPageContent />;
}
