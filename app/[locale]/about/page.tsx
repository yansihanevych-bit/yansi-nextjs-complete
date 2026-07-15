import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us - Yansi.IO',
  description: 'Learn more about Yansi.IO and our mission',
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8 pb-0">
        <Container>
          <Breadcrumbs />
        </Container>
      </Section>

      <Section variant="dark">
        <Container size="lg">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            About Yansi.IO
          </h1>
          <p className="text-lg text-white/70">
            AI-powered marketing and development services for ambitious companies.
          </p>
        </Container>
      </Section>
    </>
  );
}
