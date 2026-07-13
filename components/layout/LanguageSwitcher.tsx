'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { localeNames } from '@/lib/i18n';

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale || ''}`);
    setIsOpen(false);
  };

  const currentLanguage = localeNames[locale as keyof typeof localeNames];

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-yansi-text hover:text-yansi-accent transition-colors border border-white/10 rounded-lg hover:border-white/20"
        aria-label={t('header.language_select')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v1M3 5a2 2 0 002 2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v1"
          />
        </svg>
        <span>{currentLanguage}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 z-50 bg-yansi-dark border border-white/10 rounded-lg overflow-hidden shadow-xl"
            >
              {Object.entries(localeNames).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => handleLanguageChange(key)}
                  className={`w-full px-4 py-2 text-sm text-left transition-colors ${
                    locale === key
                      ? 'bg-yansi-accent text-black font-bold'
                      : 'text-yansi-text hover:bg-white/10'
                  }`}
                >
                  {name}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitcher;
