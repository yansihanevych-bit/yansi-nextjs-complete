'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.cases'), href: '/cases' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.about'), href: '/#about' },
  ];

  return (
    <>
      {/* ✅ ИСПРАВЛЕНО: Правильный z-index (10), smooth transitions */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
          isScrolled ? 'bg-yansi-bg/80 backdrop-blur-md border-b border-white/10' : 'bg-gradient-to-b from-yansi-bg/60 to-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold font-display group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yansi-accent rounded-lg px-2 py-1"
              aria-label="Yansi.IO Home"
            >
              <span className="text-yansi-text group-hover:text-yansi-gold transition-colors duration-200">Yan</span>
              <span className="text-yansi-accent">Si</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yansi-accent rounded px-2 py-1 ${
                    pathname === item.href
                      ? 'text-yansi-accent'
                      : 'text-white/70 hover:text-yansi-gold'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              <Button
                size="sm"
                variant="solid"
                href="/contact"
                as="a"
                className="hidden sm:flex"
                aria-label={t('nav.contact')}
              >
                {t('nav.contact')}
              </Button>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-yansi-text hover:text-yansi-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yansi-accent rounded-lg"
                aria-label={t('header.toggle_menu')}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            items={navItems}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}

export default Header;
