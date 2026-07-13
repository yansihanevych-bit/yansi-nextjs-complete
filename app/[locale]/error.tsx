'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section variant="dark">
      <Container size="md">
        <div className="text-center space-y-6 py-20">
          <h1 className="text-4xl font-bold">Something went wrong!</h1>
          <p className="text-white/70">{error.message || 'An unexpected error occurred'}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()}>Try again</Button>
            <Button variant="outline" href="/">Go Home</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
