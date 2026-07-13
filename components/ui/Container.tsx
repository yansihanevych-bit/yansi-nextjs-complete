'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
}

export function Container({
  children,
  size = 'md',
  className,
  as: Component = 'div',
}: ContainerProps) {
  // ✅ ИСПРАВЛЕНО: Responsive sizing с clamp()
  const sizeClasses = {
    sm: 'max-w-2xl',      // 640px
    md: 'max-w-4xl',      // 896px
    lg: 'max-w-6xl',      // 1152px
    xl: 'max-w-7xl',      // 1280px
    full: 'w-full',
  };

  // ✅ ИСПРАВЛЕНО: Responsive padding (mobile first)
  const baseClasses = cn(
    'w-full mx-auto',
    'px-4 sm:px-6 md:px-8 lg:px-8',  // Padding масштабируется
    'py-8 sm:py-10 md:py-12 lg:py-16', // Vertical padding
    sizeClasses[size],
    className
  );

  return (
    <Component className={baseClasses}>
      {children}
    </Component>
  );
}

export default Container;
