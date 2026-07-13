# 🚀 Yansi.IO - AI Marketing & Development Services

Enterprise-grade marketing and AI development services platform built with Next.js 15, TypeScript, and modern web technologies.

## 🎯 Project Overview

**Yansi.IO** is a comprehensive web application providing:

- **AI-Powered Marketing Services** - Performance advertising, content marketing, SEO
- **Development Services** - Web, blockchain, custom AI solutions
- **Industry Solutions** - SaaS, FinTech, HealthTech, E-Commerce
- **Platform Integrations** - Shopify, WordPress, Magento, OpenCart, NFT Marketplaces

**Live:** https://yan-si.io  
**Status:** Production Ready ✅

---

## 📊 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod

### Internationalization
- **i18n:** next-intl
- **Languages:** English (en), Ukrainian (uk), Russian (ru)

### Backend & APIs
- **API:** Next.js API Routes
- **Bot Integration:** Telegram Bot API
- **Validation:** Zod schemas
- **Security:** Honeypot, Rate limiting, CSRF protection

### Deployment
- **Hosting:** Vercel (recommended)
- **CDN:** Vercel Edge Network
- **Database:** Optional (PostgreSQL, MongoDB)

---

## 🗂️ Project Structure

```
yansi-nextjs/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   │   └── contact/route.ts      # Contact form endpoint
│   ├── [locale]/                 # Localized pages
│   │   ├── layout.tsx            # Root layout with SEO
│   │   ├── page.tsx              # Home page
│   │   ├── contact/              # Contact page
│   │   ├── services/             # Services pages (16 routes)
│   │   ├── solutions/            # Industry solutions (5 routes)
│   │   ├── platforms/            # Platform integrations (5 routes)
│   │   ├── industries/           # Industry-specific (2 routes)
│   │   ├── tools/                # Utility tools (2 routes)
│   │   ├── guides/               # Educational guides (2 routes)
│   │   ├── blog/                 # Blog page
│   │   ├── cases/                # Case studies
│   │   └── policies/             # Terms & policies
│   ├── layout.tsx                # Global layout
│   └── globals.css               # Global styles
│
├── components/                   # React Components (Reusable)
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileMenu.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── ui/                       # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── CTA.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── ...
│   └── forms/                    # Form components
│       └── LeadForm.tsx          # Contact form
│
├── lib/                          # Utilities & Libraries
│   ├── seo.ts                    # SEO metadata generation
│   ├── telegram.ts               # Telegram Bot integration
│   ├── logger.ts                 # Logging utilities
│   ├── schemas.ts                # Zod validation schemas
│   ├── constants.ts              # App constants
│   ├── utils.ts                  # Helper functions
│   └── hooks/                    # Custom React hooks
│       └── useContactFormData.ts
│
├── messages/                     # i18n Translations
│   ├── en.json                   # English (87 keys)
│   ├── uk.json                   # Ukrainian (87 keys)
│   └── ru.json                   # Russian (87 keys)
│
├── public/                       # Static Assets
│   ├── robots.txt                # SEO robots rules
│   ├── sitemap.xml               # XML sitemap (38 URLs)
│   └── manifest.json             # PWA manifest
│
├── styles/                       # Global Styles
│   └── globals.css
│
├── types/                        # TypeScript Types
│   └── index.ts
│
├── middleware.ts                 # Next.js i18n middleware
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
├── .env.example                  # Environment template
├── .env.local                    # Environment (git-ignored)
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Code formatting
├── README.md                     # This file
├── DEPLOYMENT.md                 # Deployment guide
├── PROJECT_STRUCTURE.md          # Detailed structure
├── CHANGELOG.md                  # Version history
└── vercel.json                   # Vercel configuration

```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation.

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ (recommended: 20 LTS)
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/yansi-io/yansi-nextjs.git
cd yansi-nextjs

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

---

## 📝 Available Scripts

### Development
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript check
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

### Production
```bash
npm run build            # Build optimized bundle
npm run start            # Start production server
npm run preview          # Preview production build locally
```

---

## 🌍 Environment Variables

Required environment variables for production:

```env
# Application
NEXT_PUBLIC_SITE_URL=https://yan-si.io

# Telegram Bot (get from @BotFather)
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id

# Security
RATE_LIMIT_REQUESTS=3
RATE_LIMIT_WINDOW_MS=3600000

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
NEXT_PUBLIC_GTAG_ID=your_gtm_id
```

See [.env.example](./.env.example) for all options.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Set environment variables in Vercel dashboard
# Dashboard → Settings → Environment Variables
```

Or connect GitHub repo directly to Vercel:
1. Go to vercel.com
2. Import GitHub repository
3. Configure environment variables
4. Deploy automatically on push

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide.

### Docker

```bash
docker build -t yansi-io .
docker run -p 3000:3000 -e TELEGRAM_BOT_TOKEN=xxx yansi-io
```

### Self-Hosted

```bash
# Build
npm run build

# Start
npm start
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for nginx/PM2/systemd setup.

---

## 📱 Features

### ✅ 38 Pages
- Home, Services, Solutions, Platforms
- Industry-specific pages
- Tools, Guides, Blog, Cases
- Complete site structure

### ✅ Localization (i18n)
- 3 full languages: English, Ukrainian, Russian
- 87 translation keys per language
- Dynamic language switching
- hreflang for SEO

### ✅ SEO Ready
- Meta tags on all pages
- robots.txt & sitemap.xml
- JSON-LD schemas
- OpenGraph & Twitter Cards
- 95+ Lighthouse score

### ✅ Forms & Leads
- Contact form with validation
- Telegram bot notifications
- Rate limiting & honeypot
- Success/error messages

### ✅ Security
- Input validation (Zod)
- CSRF protection
- Honeypot spam filter
- Rate limiting
- XSS protection

### ✅ Performance
- Server-side rendering (SSR)
- Image optimization
- Code splitting
- Compression
- 95+ Lighthouse Performance

### ✅ Accessibility
- WCAG AA+ compliance
- ARIA labels
- Focus states
- Keyboard navigation
- Screen reader support

---

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide & checklist
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Detailed structure
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[.env.example](./.env.example)** - Environment template

---

## 🔒 Security

### Protected Endpoints
- Form validation with Zod
- Rate limiting (3 requests/hour)
- Honeypot spam protection
- Input sanitization
- HTTPS enforced
- Security headers configured

### Secrets Management
- `.env.local` in .gitignore
- No hardcoded secrets
- Environment-based configuration
- Secure Telegram token

### Best Practices
- TypeScript strict mode
- ESLint configured
- Regular dependency updates
- Security headers enabled

---

## 🐛 Bug Reports

Found a bug? Create an issue on GitHub:
```
https://github.com/yansi-io/yansi-nextjs/issues
```

Include:
- Description
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS info

---

## 💡 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Create Pull Request

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 📞 Support

- **Email:** support@yan-si.io
- **Telegram:** @yansi_io
- **Website:** https://yan-si.io

---

## 🙏 Acknowledgments

Built with modern web technologies:
- Next.js team
- Tailwind CSS team
- React community
- Open source contributors

---

**Made with ❤️ by Yansi.IO**  
*Transform Your Growth with AI-Powered Solutions*

