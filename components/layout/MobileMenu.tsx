'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  items: Array<{ label: string; href: string }>;
  onClose: () => void;
}

export function MobileMenu({ items, onClose }: MobileMenuProps) {
  const t = useTranslations();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 left-0 right-0 z-40 bg-yansi-bg/95 backdrop-blur-md border-b border-white/10 md:hidden"
      aria-label={t('header.mobile_menu')}
    >
      <div className="p-4 space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              className="block px-4 py-2 text-white/70 hover:text-yansi-gold transition-colors rounded-lg hover:bg-white/5"
              onClick={onClose}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: items.length * 0.1 }}
          className="pt-3 border-t border-white/10"
        >
          <Button
            size="md"
            variant="solid"
            fullWidth
            href="/contact"
            as="a"
            onClick={onClose}
          >
            {t('nav.contact')}
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default MobileMenu;
