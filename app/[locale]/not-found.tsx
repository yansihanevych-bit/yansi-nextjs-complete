import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export const metadata = {
  title: '404 - Page Not Found | Yansi.IO',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <Section variant="dark">
      <Container size="md">
        <div className="text-center space-y-6 py-20">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-white/70">
            Sorry, we couldn't find the page you are looking for.
          </p>
          <Button href="/">Go Home</Button>
        </div>
      </Container>
    </Section>
  );
}
