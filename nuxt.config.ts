// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nitro-cloudflare-dev',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // pages set a short title; the template appends the brand
      title: 'Professional Mobile & Stationed Auto Detailing',
      titleTemplate: '%s | Eddie APS Detailing',
      meta: [
        { name: 'description', content: 'Premium mobile and stationed auto detailing services. Restore your vehicle\'s shine with expert care, convenience, and eco-friendly products.' },
        { name: 'theme-color', content: '#1e40af' },
        { name: 'keywords', content: 'mobile car detailing, auto detailing, car detailing near me, interior car cleaning, exterior detailing, headlight restoration, paint polishing' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Eddie APS Detailing' },
        { property: 'og:url', content: 'https://eddieapsdetailing.com' },
        { property: 'og:image', content: 'https://eddieapsdetailing.com/og-image.png' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Eddie APS Detailing - Car Wash and Detailing. Precision. Shine. Perfection.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://eddieapsdetailing.com/og-image.png' },
        { name: 'twitter:image:alt', content: 'Eddie APS Detailing - Car Wash and Detailing. Precision. Shine. Perfection.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap' },
      ],
    },
  },

  site: {
    url: 'https://eddieapsdetailing.com',
    name: 'Eddie APS Detailing',
    description: 'Professional Mobile & Stationed Auto Detailing Services',
    defaultLocale: 'en',
  },

  sitemap: {
    enabled: true,
    // the portal is private — it should never be advertised to crawlers
    exclude: ['/admin', '/admin/**'],
  },

  robots: {
    enabled: true,
    // Deliberately no Disallow for /admin: a disallowed URL is never crawled,
    // so Google never sees the noindex and can still list the bare URL. The
    // portal is kept out of the index by the X-Robots-Tag header in routeRules
    // plus its exclusion from the sitemap.
  },

  ogImage: {
    enabled: false,
  },

  image: {
    provider: 'ipx',
    format: ['webp', 'avif'],
    quality: 80,
  },

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      routes: ['/', '/services', '/book', '/quote', '/gallery', '/blog', '/about', '/contact'],
      crawlLinks: true,
    },
    routeRules: {
      '/api/**': { cors: true },
      // X-Robots-Tag is server-enforced, so the portal stays out of the index
      // even if a crawler ignores robots.txt
      '/admin/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
      '/admin': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    },
  },

  runtimeConfig: {
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    r2BucketName: process.env.R2_BUCKET_NAME,
    resendApiKey: process.env.RESEND_API_KEY,
    notifyEmail: process.env.NOTIFY_EMAIL,
    notifyFrom: process.env.NOTIFY_FROM,
    // SMTP (configure later)
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    smtpFrom: process.env.SMTP_FROM,
    smtpSecure: process.env.SMTP_SECURE,
    public: {
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      siteUrl: 'https://eddieapsdetailing.com',
      phonePrimary: '0595118973',
      phoneSecondary: '0591357411',
      whatsappNumber: '0595118973',
      whatsappNumberSecondary: '0591357411',
    },
  },

  typescript: {
    strict: true,
  },

  colorMode: {
    preference: 'light',
  },
})
