# Eddie APS Detailing Website Development Prompt (Vue.js + Cloudflare)

Build a complete, production-ready, SEO-optimized, responsive website for **Eddie APS Detailing** using a modern Vue.js stack designed specifically for deployment on Cloudflare.

## Technology Stack

Frontend:

* Vue 3
* Nuxt 3
* TypeScript
* Composition API
* Tailwind CSS
* Nuxt UI or Headless UI
* VueUse utilities
* Vue animations / Motion

Deployment:

* Cloudflare Pages
* Cloudflare Workers
* Cloudflare D1 Database
* Cloudflare R2 Storage
* Cloudflare KV
* Cloudflare Turnstile

Database:

* Cloudflare D1
* Drizzle ORM

---

# Business Information

Business Name:
Eddie APS Detailing

Website:
Eddieapsdetailing.com

Industry:
Mobile and Stationed Auto Detailing

Brand Colors:

* Primary: Blue
* Secondary: White
* Accent: Dark Navy
* Neutral: Light Gray

Contact:
0595118973
0591357411

---

# Business Purpose

Provide busy vehicle owners with convenient, high-quality, and eco-friendly detailing services that restore and preserve their vehicle's beauty, delivered directly to their location.

---

# Vision

Become the most trusted and convenient provider of mobile and stationed car detailing services by delivering exceptional results and a seamless customer experience.

---

# Website Goals

The website must:

* Generate customer bookings
* Increase phone inquiries
* Showcase detailing results
* Build customer trust
* Rank on Google
* Provide a smooth mobile experience

---

# Website Pages

## Homepage

Create a premium landing page with:

Hero section:

* High-quality vehicle detailing image/video
* Strong headline
* Call-to-action buttons

Headline:

"Premium Mobile & Stationed Auto Detailing Services"

CTA:

* Book Appointment
* Get Free Quote
* Call Now

Sections:

* About Eddie APS Detailing
* Services
* Why Choose Us
* Before & After Gallery
* Customer Reviews
* Booking Process
* FAQ
* Contact
* Footer

---

## Services Page

Create individual SEO-friendly service pages:

* Complete Detailing
* Deep Interior Detailing
* Exterior Detailing
* Engine Detailing
* Paint Polishing
* Headlight Restoration
* Mobile Detailing
* Waxing
* Paint Protection

Each service page must include:

* Description
* Benefits
* Process
* Images
* FAQs
* Booking CTA

---

## Gallery

Create:

* Before/After slider
* Image categories
* Lightbox
* Lazy loading
* Responsive images

Use Cloudflare R2 for image storage.

---

## Booking System

Create a functional booking system.

Fields:

Customer:

* Name
* Phone
* Email

Vehicle:

* Make
* Model
* Year
* Vehicle type

Service:

* Selected service
* Preferred date
* Preferred time

Mobile service:

* Location/address

Additional:

* Notes
* Upload vehicle images

Features:

* Booking confirmation
* Admin notification
* Database storage
* Spam protection

---

## Quote Request System

Create a quote form:

* Customer details
* Vehicle details
* Service required
* Vehicle condition
* Image upload
* Preferred date

Store submissions in Cloudflare D1.

---

# Admin Dashboard

Create a secure admin area.

Features:

* Login authentication
* Manage bookings
* Manage customers
* Manage services
* Manage gallery
* Manage testimonials
* Manage blog posts
* View contact messages

---

# Blog System

Create SEO-focused blog.

Categories:

* Car Care Tips
* Interior Cleaning
* Paint Protection
* Detailing Advice
* Vehicle Maintenance

Features:

* Markdown or CMS editing
* Categories
* Tags
* Search
* Related posts

---

# SEO Requirements

Use Nuxt SEO features.

Implement:

* Dynamic page titles
* Meta descriptions
* Canonical URLs
* Open Graph tags
* Twitter cards
* Sitemap.xml
* Robots.txt

Structured Data:

* LocalBusiness Schema
* Service Schema
* FAQ Schema
* Review Schema
* Breadcrumb Schema

Optimize keywords:

* Mobile car detailing
* Auto detailing
* Car detailing services
* Interior car cleaning
* Exterior detailing
* Engine detailing
* Headlight restoration
* Paint polishing

---

# Performance Requirements

Target:

Google Lighthouse 95+

Implement:

* Server-side rendering
* Static generation where possible
* Image optimization
* WebP/AVIF
* Lazy loading
* Code splitting
* Asset compression
* CDN caching

---

# Cloudflare Requirements

Deploy on:

Cloudflare Pages

Use:

* Cloudflare Workers for APIs
* D1 database
* R2 image storage
* KV caching
* Turnstile captcha

Generate:

* wrangler.toml
* D1 migrations
* Environment variable documentation
* Deployment instructions

---

# Security

Implement:

* Input validation
* Secure API routes
* Rate limiting
* CSRF protection
* XSS protection
* Secure authentication
* Turnstile spam protection

---

# User Experience

Must include:

* Mobile-first design
* Sticky navigation
* Smooth scrolling
* WhatsApp button
* Click-to-call button
* Booking CTA throughout site
* Loading animations
* Error pages
* Accessible forms

Follow WCAG 2.2 accessibility standards.

---

# Final Deliverable

Deliver a complete Eddie APS Detailing website that is:

* Built with Vue 3 + Nuxt 3
* Cloudflare optimized
* SEO ready
* Fast
* Secure
* Responsive
* Easy to maintain
* Ready for production deployment


eddie-aps-detailing/
├── .env.example
├── .gitignore
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── wrangler.toml
├── drizzle.config.ts
├── tailwind.config.ts
├── app.vue
├── assets/
│   └── css/
│       └── main.css
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── about.vue
│   ├── services.vue
│   ├── services/[slug].vue
│   ├── booking.vue
│   ├── quote.vue
│   ├── gallery.vue
│   ├── blog.vue
│   ├── blog/[slug].vue
│   ├── contact.vue
│   └── admin/
│       ├── index.vue
│       ├── bookings.vue
│       └── login.vue
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── HeroSection.vue
│   ├── AboutSection.vue
│   ├── WhyChooseUs.vue
│   ├── ProcessSection.vue
│   ├── ServicesSection.vue
│   ├── PackagesSection.vue
│   ├── GallerySection.vue
│   ├── TestimonialsSection.vue
│   ├── FAQSection.vue
│   ├── BookingForm.vue
│   ├── QuoteForm.vue
│   ├── ContactForm.vue
│   ├── ServiceCard.vue
│   ├── TestimonialCard.vue
│   ├── BeforeAfterSlider.vue
│   ├── MobileServiceCTA.vue
│   ├── VehicleTypes.vue
│   └── ui/
│       ├── StarRating.vue
│       ├── Turnstile.vue
│       └── ImageLightbox.vue
├── composables/
│   ├── useSeo.ts
│   ├── useBooking.ts
│   ├── useQuote.ts
│   ├── useToast.ts
│   └── useTurnstile.ts
├── stores/
│   ├── booking.ts
│   └── ui.ts
├── middleware/
│   └── auth.global.ts
├── server/
│   ├── tsconfig.json
│   ├── api/
│   │   ├── bookings.post.ts
│   │   ├── quotes.post.ts
│   │   ├── reviews.get.ts
│   │   ├── blog.get.ts
│   │   ├── blog/[slug].get.ts
│   │   ├── services.get.ts
│   │   ├── upload.post.ts
│   │   ├── contact.post.ts
│   │   ├── admin/
│   │   │   ├── login.post.ts
│   │   │   ├── logout.post.ts
│   │   │   ├── bookings.get.ts
│   │   │   └── dashboard.get.ts
│   │   └── turnstile/
│   │       └── verify.post.ts
│   ├── database/
│   │   ├── schema.ts
│   │   ├── index.ts
│   │   └── migrations/
│   │       └── 0001_init.sql
│   ├── utils/
│   │   ├── auth.ts
│   │   ├── turnstile.ts
│   │   ├── validation.ts
│   │   └── r2.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── rateLimit.ts
│   └── plugins/
│       └── db.ts
└── types/
    └── index.ts