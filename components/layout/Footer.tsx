'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: '✉️', label: t('footer.label_email'), value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { icon: '📱', label: t('footer.label_phone'), value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
    { icon: '💬', label: t('footer.label_telegram'), value: SITE_CONFIG.telegram, href: `https://t.me/${SITE_CONFIG.telegram.slice(1)}` },
  ];

  return (
    <footer className="relative bg-yansi-footer border-t border-white/10">
      <Container className="py-16 md:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="text-2xl font-bold font-display mb-4 inline-block group">
              <span className="text-yansi-text group-hover:text-yansi-gold transition-colors">Yan</span>
              <span className="text-yansi-accent">Si</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Links sections */}
          {Object.entries(FOOTER_LINKS).map(([key, links], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-mono text-xs font-bold text-yansi-gold uppercase tracking-widest mb-4">
                {t(`footer.section_${key}`)}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-yansi-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-mono text-xs font-bold text-yansi-gold uppercase tracking-widest mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <a
                    href={info.href}
                    className="text-sm text-white/60 hover:text-yansi-accent transition-colors"
                  >
                    <span className="mr-2">{info.icon}</span>
                    {info.value}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 md:pt-12">
          {/* Bottom content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm text-white/40"
            >
              © {currentYear} Yansi.IO. {t('footer.rights')}
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              {[
                { icon: 'f', label: 'LinkedIn', href: SITE_CONFIG.linkedin },
                { icon: 'tw', label: 'Twitter', href: SITE_CONFIG.twitter },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-yansi-accent transition-colors"
                  aria-label={social.label}
                >
                  <span className="text-xs font-bold">{social.label}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-yansi-accent/5 to-transparent pointer-events-none" />
    </footer>
  );
}

export default Footer;
