'use client';

import { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface LeadFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  variant?: 'default' | 'compact' | 'minimal';
}

type SubmitState = {
  type: 'success' | 'error' | null;
  text: string;
};

export function LeadForm({ onSuccess, onError }: LeadFormProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitState>({ type: null, text: '' });
  const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSubmitTimeRef = useRef<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  });

  // ✅ ИСПРАВЛЕНО: Правильное отключение формы
  const isFormDisabled = isSubmitting || !isValid;

  const onSubmit = useCallback(
    async (formData: ContactFormData) => {
      const now = Date.now();
      if (now - lastSubmitTimeRef.current < 2000) {
        return;
      }
      lastSubmitTimeRef.current = now;

      setIsSubmitting(true);
      setSubmitMessage({ type: null, text: '' });

      try {
        if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim() || !formData.message?.trim()) {
          throw new Error('Missing required fields');
        }

        const metadata = {
          pageName: typeof document !== 'undefined' ? document.title : undefined,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
          language: typeof window !== 'undefined' ? (window.location.pathname.split('/')[1] || 'en') : 'en',
          referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        };

        const url = new URL(typeof window !== 'undefined' ? window.location.href : '');
        const utmParams = {
          utm_source: url.searchParams.get('utm_source') || undefined,
          utm_medium: url.searchParams.get('utm_medium') || undefined,
          utm_campaign: url.searchParams.get('utm_campaign') || undefined,
          utm_content: url.searchParams.get('utm_content') || undefined,
          utm_term: url.searchParams.get('utm_term') || undefined,
          gclid: url.searchParams.get('gclid') || undefined,
          fbclid: url.searchParams.get('fbclid') || undefined,
        };

        const fullData = {
          ...formData,
          ...metadata,
          ...utmParams,
        };

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullData),
          signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        setSubmitMessage({
          type: 'success',
          text: t('form.success'),
        });

        reset();
        onSuccess?.();

        submitTimeoutRef.current = setTimeout(() => {
          setSubmitMessage({ type: null, text: '' });
        }, 5000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        console.error('Form submission error:', errorMessage);

        setSubmitMessage({
          type: 'error',
          text: t('form.error'),
        });
        onError?.(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [t, onSuccess, onError, reset]
  );

  // ✅ ИСПРАВЛЕНО: Responsive input styling
  const inputClasses =
    'w-full px-4 py-3 sm:py-4 text-base rounded-lg bg-white/5 border border-white/10 text-yansi-text placeholder-white/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yansi-accent disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/20';

  const labelClasses = 'block text-sm sm:text-base font-medium text-white/90 mb-2';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full space-y-6 sm:space-y-8"
      aria-label={t('form.contact_form')}
    >
      {/* ✅ ИСПРАВЛЕНО: Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClasses}>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">👤</span>
              {t('form.name')}
              {true && <span className="text-yansi-red" aria-label={t('accessibility.required_field')}>*</span>}
            </span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder={t('form.name_placeholder')}
            autoComplete="name"
            disabled={isFormDisabled}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClasses}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                id="name-error"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-yansi-red mt-2"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">📧</span>
              {t('form.email')}
              {true && <span className="text-yansi-red" aria-label={t('accessibility.required_field')}>*</span>}
            </span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder={t('form.email_placeholder')}
            autoComplete="email"
            disabled={isFormDisabled}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClasses}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                id="email-error"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-yansi-red mt-2"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClasses}>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">📱</span>
              {t('form.phone')}
              {true && <span className="text-yansi-red" aria-label={t('accessibility.required_field')}>*</span>}
            </span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder={t('form.phone_placeholder')}
            autoComplete="tel"
            disabled={isFormDisabled}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={inputClasses}
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                id="phone-error"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-yansi-red mt-2"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Telegram (Optional) */}
        <div>
          <label htmlFor="telegram" className={labelClasses}>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">💬</span>
              {t('form.telegram')}
            </span>
          </label>
          <input
            {...register('telegram')}
            type="text"
            id="telegram"
            placeholder={t('form.telegram_placeholder')}
            disabled={isFormDisabled}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          <span className="flex items-center gap-2">
            <span aria-hidden="true">💬</span>
            {t('form.message')}
            {true && <span className="text-yansi-red" aria-label={t('accessibility.required_field')}>*</span>}
          </span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          placeholder={t('form.message_placeholder')}
          disabled={isFormDisabled}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputClasses} resize-none min-h-32 sm:min-h-40`}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              id="message-error"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-yansi-red mt-2"
            >
              {errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Budget (Optional) */}
      <div>
        <label htmlFor="budget" className={labelClasses}>
          <span className="flex items-center gap-2">
            <span aria-hidden="true">💰</span>
            {t('form.budget')}
          </span>
        </label>
        <select
          {...register('budget')}
          id="budget"
          disabled={isFormDisabled}
          className={inputClasses}
        >
          <option value="">{t('form.budget_select')}</option>
          <option value="500-1000">$500 - $1,000</option>
          <option value="1500-2000">$1,500 - $2,000</option>
          <option value="2000-5000">$2,000 - $5,000</option>
          <option value="5000plus">$5,000+</option>
        </select>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website_url"
        style={{ display: 'none' }}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />

      {/* Success Message */}
      <AnimatePresence>
        {submitMessage.type === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-300 flex items-start gap-3"
            role="status"
            aria-live="polite"
          >
            <span className="text-lg flex-shrink-0">✅</span>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base">{t('form.success_title')}</p>
              <p className="text-sm opacity-90">{submitMessage.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {submitMessage.type === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg border border-yansi-red/30 bg-yansi-red/10 text-yansi-red flex items-start gap-3"
            role="alert"
            aria-live="assertive"
          >
            <span className="text-lg flex-shrink-0">❌</span>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base">{t('form.error_title')}</p>
              <p className="text-sm opacity-90">{submitMessage.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        variant="solid"
        fullWidth
        disabled={isFormDisabled}
        aria-disabled={isFormDisabled}
        aria-label={isSubmitting ? t('form.submitting') : t('form.submit')}
      >
        {isSubmitting && <span className="inline-block animate-spin">⏳</span>}
        {isSubmitting ? t('form.submitting') : t('form.submit')}
      </Button>

      {/* Privacy Note */}
      <p className="text-xs sm:text-sm text-white/40 text-center leading-relaxed">
        {t('form.privacy')}
      </p>
    </form>
  );
}

export default LeadForm;
