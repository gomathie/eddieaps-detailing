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
      title: 'Eddie APS Detailing | Professional Mobile & Stationed Auto Detailing',
      meta: [
        { name: 'description', content: 'Premium mobile and stationed auto detailing services. Restore your vehicle\'s shine with expert care, convenience, and eco-friendly products.' },
        { name: 'theme-color', content: '#1e40af' },
        { name: 'keywords', content: 'mobile car detailing, auto detailing, car detailing near me, interior car cleaning, exterior detailing, headlight restoration, paint polishing' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Eddie APS Detailing' },
        { name: 'twitter:card', content: 'summary_large_image' },
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
  },

  robots: {
    enabled: true,
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
      '/admin/**': { ssr: false },
    },
  },

  runtimeConfig: {
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH,
    jwtSecret: process.env.JWT_SECRET,
    r2BucketName: process.env.R2_BUCKET_NAME,
    resendApiKey: process.env.RESEND_API_KEY,
    notifyEmail: process.env.NOTIFY_EMAIL,
    notifyFrom: process.env.NOTIFY_FROM,
    public: {
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      siteUrl: 'https://eddieapsdetailing.com',
      phonePrimary: '0595118973',
      phoneSecondary: '0591357411',
      whatsappNumber: '0595118973',
    },
  },

  typescript: {
    strict: true,
  },

  colorMode: {
    preference: 'light',
  },
})
