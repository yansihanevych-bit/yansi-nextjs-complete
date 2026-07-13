import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export default function Loading() {
  return (
    <Section variant="dark">
      <Container size="lg">
        <div className="space-y-6 py-20">
          <div className="h-12 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-64 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-white/10 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
