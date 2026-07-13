# 📁 PROJECT STRUCTURE GUIDE

Detailed documentation of the Yansi.IO project structure.

---

## 📂 Root Directory

```
yansi-nextjs/
├── app/                    # Next.js App Router (Main Application)
├── components/             # React Components
├── lib/                    # Utilities & Libraries
├── public/                 # Static Assets
├── messages/               # i18n Translations
├── styles/                 # Global Styles
├── types/                  # TypeScript Types
├── middleware.ts           # i18n Middleware
├── next.config.js          # Next.js Configuration
├── tailwind.config.ts      # Tailwind CSS Configuration
├── tsconfig.json           # TypeScript Configuration
├── package.json            # Dependencies & Scripts
├── .env.example            # Environment Template
├── .env.local              # Environment (git-ignored)
├── .gitignore              # Git Ignore Rules
├── .prettierrc              # Code Formatting Rules
├── README.md               # Project Overview
├── DEPLOYMENT.md           # Deployment Guide
├── CHANGELOG.md            # Version History
├── vercel.json             # Vercel Configuration
└── PROJECT_STRUCTURE.md    # This File
```

---

## 📂 app/ - Next.js 15 App Router

### Root Layout

**`app/layout.tsx`**
- Global HTML structure
- Global meta tags & SEO
- Google Analytics
- Font preloading
- Theme configuration

### Root API

**`app/api/`**
```
app/api/
└── contact/
    └── route.ts            # POST /api/contact endpoint
```

### Localized Routes

**`app/[locale]/`** - All routes localized with locale parameter
- Supports: `en`, `uk`, `ru`
- Example: `/en/services`, `/uk/contact`, `/ru/blog`

### Pages Structure

```
app/[locale]/
├── layout.tsx              # Locale layout
├── page.tsx                # Home page (/)
├── contact/
│   └── page.tsx           # Contact page (/contact)
├── services/               # Services category (15 pages)
│   ├── page.tsx           # /services
│   ├── performance-advertising/
│   ├── google-ads/
│   ├── meta-ads/
│   ├── bing-ads/
│   ├── tiktok-ads/
│   ├── youtube-ads/
│   ├── x-ads/
│   ├── content-marketing/
│   ├── email-marketing/
│   ├── seo/
│   ├── ai-development/
│   ├── web-development/
│   ├── blockchain-development/
│   ├── custom-ai-agents/
│   └── google-shopping/
├── solutions/              # Industry solutions (5 pages)
│   ├── page.tsx
│   ├── saas/
│   ├── fintech/
│   ├── healthtech/
│   ├── ecommerce/
│   └── travel-education/
├── platforms/              # Platform integrations (5 pages)
│   ├── page.tsx
│   ├── shopify/
│   ├── wordpress/
│   ├── magento/
│   ├── opencart/
│   └── nft-marketplace/
├── industries/             # Industry-specific (2 pages)
│   ├── specialized/
│   └── supply-chain/
├── ai-agents/
│   └── osint/
├── tools/                  # Utility tools (2 pages)
│   ├── calculator/
│   └── utm-generator/
├── guides/                 # Educational guides (2 pages)
│   ├── choose-marketing/
│   └── google-ads-generator/
├── blog/
│   └── page.tsx
├── cases/
│   └── page.tsx
└── policies/
    └── page.tsx
```

**Total Pages:** 38 (+ 3 languages = 114 routes)

---

## 🎨 components/ - React Components

### Layout Components

**`components/layout/Header.tsx`**
- Navigation bar
- Mobile menu toggle
- Language switcher
- Sticky/transparent states

**`components/layout/Footer.tsx`**
- Footer links
- Contact information
- Social links
- Copyright

**`components/layout/Navigation.tsx`**
- Main nav items
- Active route highlighting
- Responsive behavior

**`components/layout/MobileMenu.tsx`**
- Mobile navigation
- Animated menu
- Language switcher

**`components/layout/LanguageSwitcher.tsx`**
- Language dropdown
- Current language display
- Route switching

### UI Components

**`components/ui/Button.tsx`**
- Variants: solid, outline, ghost, minimal
- Sizes: sm, md, lg
- States: default, hover, disabled, loading
- Animated: optional Framer Motion

**`components/ui/Card.tsx`**
- Variants: default, bordered, elevated, gradient
- Interactive animations
- Sub-components: CardHeader, CardTitle, CardDescription, CardContent, CardFooter

**`components/ui/Container.tsx`**
- Max-width wrapper
- Responsive padding
- Semantic HTML support

**`components/ui/Section.tsx`**
- Page sections
- Background variants
- Padding options
- Animation support

**`components/ui/CTA.tsx`**
- Call-to-action section
- Title, description, buttons
- Hero-style layout

**`components/ui/Breadcrumbs.tsx`**
- Automatic route-based generation
- Schema.org markup
- Keyboard navigation

### Form Components

**`components/forms/LeadForm.tsx`**
- Contact form with validation
- React Hook Form + Zod
- Honeypot protection
- Success/error states
- ARIA labels

---

## 📚 lib/ - Utilities & Libraries

**`lib/seo.ts`** (300+ lines)
- SEO metadata generation
- OpenGraph tags
- JSON-LD schemas
- Breadcrumbs markup
- hreflang generation

**`lib/telegram.ts`**
- Telegram Bot API integration
- Message formatting
- Error handling
- Request logging

**`lib/logger.ts`**
- Centralized logging
- Log levels (debug, info, warn, error)
- File/console output

**`lib/schemas.ts`**
- Zod validation schemas
- Form validation
- Type exports

**`lib/constants.ts`**
- App constants
- Site URLs
- Configuration values

**`lib/utils.ts`**
- Helper functions
- String manipulation
- Type utilities

**`lib/hooks/useContactFormData.ts`**
- Custom hook for contact form
- UTM parameter extraction
- Tracking data

---

## 🌐 messages/ - Internationalization

```
messages/
├── en.json    # English (87 keys)
├── uk.json    # Ukrainian (87 keys)
└── ru.json    # Russian (87 keys)
```

### Translation Keys Structure

```json
{
  "nav": {
    "services": "Services",
    "contact": "Contact",
    ...
  },
  "form": {
    "name": "Full Name",
    "email": "Email Address",
    ...
  },
  "footer": {
    "label_email": "Email",
    ...
  }
}
```

---

## 🎨 styles/ - Global Styles

**`styles/globals.css`**
- Global CSS variables
- Base styles (typography, spacing)
- Responsive utilities
- Animation definitions
- Dark mode support
- Accessibility helpers

---

## 📝 types/ - TypeScript Types

**`types/index.ts`**
- Global type definitions
- Shared interfaces
- Utility types

---

## ⚙️ Configuration Files

### **`next.config.js`**
- Image optimization
- Security headers
- Compression settings
- Cache configuration
- Redirects and rewrites

### **`tailwind.config.ts`**
- Color palette
- Spacing scale
- Z-index hierarchy
- Font families
- Custom animations
- Responsive breakpoints

### **`tsconfig.json`**
- Strict mode: ON
- Module resolution
- Path aliases (@/)
- Target: ES2020

### **`middleware.ts`**
- i18n routing with next-intl
- Locale detection
- Path rewriting
- Middleware logic

---

## 📦 public/ - Static Assets

```
public/
├── robots.txt          # SEO robots rules (disallow /api, etc.)
├── sitemap.xml         # XML sitemap (38 URLs with hreflang)
├── manifest.json       # PWA manifest
└── [images, fonts, etc. - optional]
```

---

## 🚀 How It All Works

### Page Loading Flow

1. **User visits** `/uk/services/google-ads`
2. **Middleware** detects locale `uk`
3. **Page loads** from `app/[locale]/services/google-ads/page.tsx`
4. **Layout applies** from `app/[locale]/layout.tsx`
5. **Components render** (Header, Footer, Content)
6. **Translations load** from `messages/uk.json`
7. **SEO metadata** applied via `generateMetadata()`
8. **Page rendered** with all 3 language variants available

### Form Submission Flow

1. **User fills form** in `components/forms/LeadForm.tsx`
2. **Validation** with React Hook Form + Zod
3. **Honeypot check** (website_url field)
4. **POST** to `/api/contact`
5. **API validates** data again
6. **Rate limit** checked (3 per hour)
7. **Telegram message** sent
8. **Response** returned to form
9. **Success message** shown

### Internationalization Flow

1. **User visits** `/uk/...`
2. **Middleware** detects locale `uk`
3. **Messages** load from `messages/uk.json`
4. **useTranslations()** provides t() function
5. **All text** translated automatically
6. **Links** include locale param
7. **hreflang** added for all 3 languages

---

## 📊 Statistics

- **Total Pages:** 38
- **Total Routes:** 114 (38 × 3 languages)
- **Components:** 12 main components
- **Translation Keys:** 87 per language
- **Type Exports:** 6 files
- **Utility Functions:** 50+
- **Lines of Code:** 5000+

---

## 🔄 Dependencies

**Key Dependencies:**
- next: 15.0.0-rc.0
- react: ^19.0.0
- react-dom: ^19.0.0
- next-intl: ^3.9.0
- zod: ^3.22.0
- react-hook-form: ^7.51.0
- framer-motion: ^10.16.0+
- tailwindcss: ^3.3.0+

---

## ✅ Best Practices Used

✅ TypeScript strict mode  
✅ Component composition pattern  
✅ Custom hooks for logic  
✅ Type-safe props  
✅ Server components by default  
✅ Dynamic imports for heavy components  
✅ Proper error handling  
✅ Comprehensive logging  
✅ SEO optimization  
✅ Accessibility (WCAG AA+)  
✅ Responsive design (mobile-first)  
✅ Code splitting  
✅ Image optimization  
✅ Performance optimized  

---

## 🔗 Related Documentation

- [README.md](./README.md) - Project overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [.env.example](./.env.example) - Environment template

---

**Last Updated:** 2026-07-13

