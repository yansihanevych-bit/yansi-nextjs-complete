import { Metadata } from 'next';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { generateMetadata as generateSEOMetadata, getFullUrl } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// ✅ SEO METADATA - CRITICAL FIX
export const metadata: Metadata = generateSEOMetadata({
  title: 'Yansi.IO - AI-Powered Marketing & Development Services',
  description: 'Transform your business with AI-powered marketing and development services. Performance advertising, custom solutions, and proven results.',
  ogImage: getFullUrl('/og-home.png'),
  keywords: ['AI marketing', 'marketing services', 'development services', 'growth'],
});

export default function HomePage() {

  const services = [
    {
      icon: '📊',
      title: 'Performance Advertising',
      description: 'Data-driven campaigns on Google, Meta, TikTok, and more.',
    },
    {
      icon: '📝',
      title: 'Content Marketing',
      description: 'Engaging content that attracts and converts your audience.',
    },
    {
      icon: '🤖',
      title: 'AI Automation',
      description: 'Smart systems that scale your business operations.',
    },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <Section className="pt-8 pb-0">
        <Container>
          <Breadcrumbs />
        </Container>
      </Section>

      {/* Hero Section */}
      <Section variant="dark">
        <Container size="lg">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold font-display leading-tight">
              AI-Powered Growth for Ambitious Companies
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              We transform marketing and development challenges into predictable revenue growth. Strategic, data-driven, results-focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="solid" href="/contact" as="a">
                Start Growing Now
              </Button>
              <Button size="lg" variant="outline" href="/services" as="a">
                Explore Services
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Services */}
      <Section>
        <Container size="lg">
          <div className="mb-12">
            <h2 className="text-4xl font-bold font-display mb-4">What We Do</h2>
            <p className="text-white/70">
              Everything you need to grow your business online.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.title} interactive animationDelay={index * 0.1}>
                <CardHeader>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 bg-gradient-to-r from-yansi-accent/10 to-transparent">
        <Container size="md">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold font-display">
              Ready to transform your growth?
            </h2>
            <p className="text-xl text-white/70">
              Let's discuss how we can help your business thrive.
            </p>
            <Button size="lg" variant="solid" href="/contact" as="a">
              Schedule a Consultation
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
