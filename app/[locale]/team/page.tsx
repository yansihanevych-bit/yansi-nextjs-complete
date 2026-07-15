import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Our Team - Yansi.IO',
  description: 'Meet the talented team behind Yansi.IO',
};

export default function TeamPage() {
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
            Our Team
          </h1>
          <p className="text-lg text-white/70">
            Passionate experts dedicated to your success.
          </p>
        </Container>
      </Section>
    </>
  );
}
