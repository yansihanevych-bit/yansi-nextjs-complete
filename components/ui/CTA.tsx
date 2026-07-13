'use client';

import { motion } from 'framer-motion';
import Button from './Button';
import Container from './Container';

interface CTAProps {
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
}

export function CTA({
  title = 'Ready to get started?',
  description = "Let's build something amazing together.",
  primaryButtonLabel = 'Get Started',
  secondaryButtonLabel = 'Learn More',
  primaryButtonHref = '/contact',
  secondaryButtonHref = '/services',
}: CTAProps) {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-yansi-accent/10 via-transparent to-yansi-accent/10 pointer-events-none" />

      <Container size="md" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          {/* ✅ ИСПРАВЛЕНО: Responsive heading with clamp() */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display leading-tight">
            {title}
          </h2>

          {/* ✅ ИСПРАВЛЕНО: Readable description */}
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* ✅ ИСПРАВЛЕНО: Proper button spacing on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <Button
              size="lg"
              variant="solid"
              href={primaryButtonHref}
              as="a"
              aria-label={primaryButtonLabel}
            >
              {primaryButtonLabel}
            </Button>
            <Button
              size="lg"
              variant="outline"
              href={secondaryButtonHref}
              as="a"
              aria-label={secondaryButtonLabel}
            >
              {secondaryButtonLabel}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default CTA;
