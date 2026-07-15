

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  variant?: 'default' | 'dark' | 'light';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export function Section({
  children,
  variant = 'default',
  padding = 'lg',
  className,
  animate = true,
}: SectionProps) {
  // ✅ ИСПРАВЛЕНО: Responsive padding sizes
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-6 sm:py-8 md:py-10',
    md: 'py-10 sm:py-12 md:py-16',
    lg: 'py-12 sm:py-16 md:py-20 lg:py-24',
    xl: 'py-16 sm:py-20 md:py-24 lg:py-32',
  };

  const variantClasses = {
    default: 'bg-yansi-bg',
    dark: 'bg-gradient-to-b from-yansi-bg to-yansi-bg/80',
    light: 'bg-white/5',
  };

  const baseClasses = cn(
    'w-full relative',
    paddingClasses[padding],
    variantClasses[variant],
    className
  );

  if (animate) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={baseClasses}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <section className={baseClasses}>
      {children}
    </section>
  );
}

export default Section;
