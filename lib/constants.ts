/**
 * Constants and Config
 * Центральная точка для импорта всех конфигов
 */

// ✅ Импортируем из структурированных модулей
export { SITE_CONFIG, METADATA, ANIMATION_CONFIG } from '@/lib/config/site';
export { SERVICES, ADVERTISING_PLATFORMS } from '@/lib/data/services';
export { INDUSTRIES } from '@/lib/data/industries';

// ✅ Локальные константы
export const BUDGET_RANGES = [
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1500-2000', label: '$1,500 - $2,000' },
  { value: '2000-5000', label: '$2,000 - $5,000' },
  { value: '5000plus', label: '$5,000+' },
];

export const AVAILABLE_TIMES = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Services', href: '/services' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Cases', href: '/cases' },
  ],
  company: [
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'About', href: '/#about' },
  ],
  legal: [
    { label: 'Policies', href: '/policies' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

