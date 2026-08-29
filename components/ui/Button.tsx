'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  animated?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const variantClasses = {
  solid:
    'bg-yansi-accent text-black font-bold hover:bg-yansi-hover hover:shadow-glow active:scale-95 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150',
  outline:
    'border border-yansi-accent/40 text-yansi-text hover:border-yansi-accent hover:bg-yansi-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150',
  ghost:
    'text-yansi-text hover:text-yansi-accent hover:bg-yansi-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150',
  minimal:
    'text-yansi-gold hover:text-yansi-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 underline-offset-4 hover:underline',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm min-h-[40px] min-w-[80px]',
  md: 'px-4 py-2.5 text-base min-h-[44px] min-w-[100px]',
  lg: 'px-6 py-3 text-lg min-h-[48px] min-w-[120px]',
};

export function Button({
  children,
  className,
  variant = 'solid',
  size = 'md',
  fullWidth = false,
  icon,
  isLoading = false,
  disabled = false,
  animated = false,
  as = 'button',
  href,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  // ✅ ИСПРАВЛЕНО: Proper focus state с focus-visible
  const focusClasses = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yansi-accent';

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-full font-medium',
    'transition-all duration-150',
    focusClasses,
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  const ButtonComponent = as === 'a' && href ? (
    <a href={href} className={baseClasses} {...(props as any)}>
      {isLoading && (
        <svg
          className="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !isLoading && <span className="flex">{icon}</span>}
      {children}
    </a>
  ) : (
    <button className={baseClasses} disabled={isDisabled} {...props}>
      {isLoading && (
        <svg
          className="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !isLoading && <span className="flex">{icon}</span>}
      {children}
    </button>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {ButtonComponent}
      </motion.div>
    );
  }

  return ButtonComponent;
}

export default Button;
