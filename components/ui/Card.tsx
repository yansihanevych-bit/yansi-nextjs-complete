'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  className?: string;
  interactive?: boolean;
  animationDelay?: number;
}

export function Card({
  children,
  variant = 'default',
  className,
  interactive = false,
  animationDelay = 0,
}: CardProps) {
  const variantClasses = {
    default: 'bg-white/5 border border-white/10',
    bordered: 'bg-transparent border-2 border-yansi-accent/20',
    elevated: 'bg-white/10 shadow-lg',
    gradient: 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20',
  };

  const baseClasses = cn(
    'rounded-2xl p-6 md:p-8 transition-all duration-300',
    // ✅ ИСПРАВЛЕНО: Используем transform для плавного hover без CLS
    'hover:shadow-2xl',
    variantClasses[variant],
    className
  );

  const content = (
    <div className={baseClasses}>
      {children}
    </div>
  );

  // ✅ ИСПРАВЛЕНО: Используем transform вместо margin для hover
  if (interactive) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -8,  // ✅ Поднять вверх на 8px без CLS
          transition: { duration: 0.2 }
        }}
        className="h-full"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      viewport={{ once: true }}
      className="h-full"
    >
      {content}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4 pb-4 border-b border-white/10', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-xl md:text-2xl font-bold text-yansi-gold', className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm md:text-base text-white/70 leading-relaxed', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('mt-6 pt-4 border-t border-white/10 flex gap-4', className)}>
      {children}
    </div>
  );
}

export default Card;
