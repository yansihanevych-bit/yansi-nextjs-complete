import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = generateSEOMetadata({
  title: 'WordPress | Yansi.IO',
  description: 'WordPress marketing & development',
});

export default function PlatformsWordpressPage() {
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
            WordPress
          </h1>
          <p className="text-lg text-white/70">
            WordPress marketing & development
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <div className="max-w-3xl space-y-6">
            <p className="text-white/70">
              Detailed content about WordPress will be added here.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-gradient-to-r from-yansi-accent/10 to-transparent">
        <Container size="md" className="text-center space-y-6">
          <h2 className="text-4xl font-bold font-display">
            Ready to get started?
          </h2>
          <Button size="lg" variant="solid" href="/contact" as="a">
            Schedule a Consultation
          </Button>
        </Container>
      </Section>
    </>
  );
}
