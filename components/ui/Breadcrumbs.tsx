'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { useState, useEffect } from 'react';

interface BreadcrumbsProps {
  showSchema?: boolean;
}

export function Breadcrumbs({ showSchema = true }: BreadcrumbsProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ name: string; href?: string }>>([]);
  const [schemaMarkup, setSchemaMarkup] = useState<string>('');

  useEffect(() => {
    // Парсим pathname для создания breadcrumbs
    const segments = pathname.split('/').filter((s) => s && !['en', 'uk', 'ru'].includes(s));

    const crumbs: Array<{ name: string; href?: string }> = [
      { name: t('breadcrumb.home'), href: '/' },
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Генерируем название из translation ключа или самого segment
      const nameKey = `breadcrumb.${segment}`;
      const displayName = t(nameKey, segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '));

      crumbs.push({
        name: displayName,
        href: isLast ? undefined : currentPath,
      });
    });

    setBreadcrumbs(crumbs);

    // Генерируем JSON-LD schema если нужно
    if (showSchema) {
      const schemaItems = crumbs.map((crumb) => ({
        name: crumb.name,
        url: crumb.href ? `${SITE_URL}${crumb.href}` : `${SITE_URL}${pathname}`,
      }));
      const schema = generateBreadcrumbSchema(schemaItems);
      setSchemaMarkup(JSON.stringify(schema));
    }
  }, [pathname, t, showSchema]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <>
      {/* JSON-LD Schema */}
      {showSchema && schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMarkup }}
        />
      )}

      {/* Breadcrumbs Navigation */}
      <nav
        className="py-4 px-4 md:px-0 border-b border-white/5"
        aria-label={t('breadcrumb.navigation', 'Breadcrumb')}
      >
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <motion.li
              key={`${crumb.name}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2"
            >
              {/* Link */}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-white/70 hover:text-yansi-accent transition-colors"
                  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                >
                  {crumb.name}
                </Link>
              ) : (
                <span
                  className="text-white/90 font-medium"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              )}

              {/* Separator */}
              {index < breadcrumbs.length - 1 && (
                <span className="text-white/40" aria-hidden="true">
                  /
                </span>
              )}
            </motion.li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
