/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enable compression
  compress: true,

  // ✅ SWC minification

  // ✅ Image optimization
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false,
    minimumCacheTTL: 31536000, // 1 year
  },

  // ✅ i18n routing

  // ✅ Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // ✅ Security headers
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          
          // ✅ Cache headers for static assets
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // ✅ Cache images and fonts for 1 year
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // ✅ Public assets
      {
        source: '/robots.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml' },
        ],
      },
    ];
  },

  // ✅ Redirects for old URLs (if needed)
  async redirects() {
    return [
      // Add redirects here if needed
    ];
  },

  // ✅ Rewrites for API
  async rewrites() {
    return {
      beforeFiles: [
        // Add rewrites here if needed
      ],
    };
  },

  // ✅ Performance optimizations
  experimental: {
    optimizePackageImports: ['@/components/ui', '@/lib'],
    esmExternals: true,
  },

  // ✅ Disable source maps in production
  productionBrowserSourceMaps: false,

  // ✅ Trailing slash
  trailingSlash: false,

  // ✅ React strict mode
  reactStrictMode: true,

  // ✅ PoweredBy header removal
  poweredByHeader: false,

  // ✅ Internationalization
  i18n: undefined, // Handled by next-intl middleware

  // ✅ Eslint on build
  eslint: {
    dirs: ['app', 'lib', 'components'],
  },
};

module.exports = nextConfig;
