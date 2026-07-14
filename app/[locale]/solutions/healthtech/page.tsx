import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = generateSEOMetadata({
  title: 'HealthTech & MedTech | Yansi.IO',
  description: 'Healthcare industry solutions',
});

export default function SolutionsHealthtechPage() {
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
            HealthTech & MedTech
          </h1>
          <p className="text-lg text-white/70">
            Healthcare industry solutions
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <div className="max-w-3xl space-y-6">
            <p className="text-white/70">
              Detailed content about HealthTech & MedTech will be added here.
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
