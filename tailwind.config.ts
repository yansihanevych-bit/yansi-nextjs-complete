import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ✅ CUSTOM COLORS
      colors: {
        'yansi-text': '#FFF5EF',
        'yansi-gold': '#FFB347',
        'yansi-accent': '#FF8A00',
        'yansi-hover': '#FF5A00',
        'yansi-red': '#FF2D00',
        'yansi-bg': '#111111',
        'yansi-dark': '#0a0a0a',
        'yansi-footer': '#050505',
      },

      // ✅ CUSTOM SPACING - Consistent scale
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      // ✅ Z-INDEX HIERARCHY
      zIndex: {
        '0': '0',
        '10': '10',    // Sticky header
        '20': '20',    // Dropdowns
        '30': '30',    // Popovers
        '40': '40',    // Mobile menu
        '50': '50',    // Modals
        '60': '60',    // Tooltips
        '70': '70',    // Notifications
        '999': '999',  // Last resort
      },

      // ✅ FONTS
      fontFamily: {
        'display': ['Unbounded', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },

      // ✅ ANIMATIONS
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 300ms ease-out',
        slideUp: 'slideUp 400ms ease-out',
        slideDown: 'slideDown 400ms ease-out',
        slideLeft: 'slideLeft 400ms ease-out',
        slideRight: 'slideRight 400ms ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // ✅ SHADOWS
      boxShadow: {
        glow: '0 0 20px rgba(255, 139, 0, 0.5)',
        'glow-lg': '0 0 30px rgba(255, 139, 0, 0.8)',
      },

      // ✅ BACKDROP BLUR
      backdropBlur: {
        md: '12px',
      },

      // ✅ TRANSITION
      transitionDuration: {
        '250': '250ms',
      },

      // ✅ MIN/MAX SIZES для доступности
      minHeight: {
        '12': '3rem',    // 48px - minimum touch target
      },

      minWidth: {
        '12': '3rem',    // 48px - minimum touch target
        '20': '5rem',
        '24': '6rem',
      },
    },
  },

  // ✅ PLUGINS
  plugins: [],

  // ✅ CACHING (для prod)
  cacheStrategy: 'content-hash',
};

export default config;
