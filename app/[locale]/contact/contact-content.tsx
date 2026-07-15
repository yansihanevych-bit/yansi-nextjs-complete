'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import LeadForm from '@/components/forms/LeadForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function ContactPageContent() {
  const t = useTranslations();

  return (
    <>
      {/* Breadcrumbs */}
      <Section className="pt-8 pb-0">
        <Container>
          <Breadcrumbs />
        </Container>
      </Section>

      {/* Hero */}
      <Section variant="dark">
        <Container size="lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 leading-tight">
              {t('contact.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              {t('contact.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Form Section */}
      <Section>
        <Container size="md">
          <div className="max-w-2xl">
            <LeadForm
              onSuccess={() => {
                // Form successfully submitted - handled by form component
              }}
            />
          </div>
        </Container>
      </Section>

      {/* Info Section */}
      <Section className="py-20 bg-gradient-to-r from-yansi-accent/10 to-transparent">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">📧</div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-white/70">hello@yan-si.io</p>
            </div>
            <div>
              <div className="text-4xl mb-2">📱</div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-white/70">+380 50 123 4567</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💬</div>
              <h3 className="font-bold mb-2">Telegram</h3>
              <p className="text-white/70">@yansi_io</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
