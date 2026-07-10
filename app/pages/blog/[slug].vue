<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

// Pre-written rich markdown content as fallbacks for SEO sitemaps
const staticPostsCatalog: Record<string, any> = {
  'ceramic-coating-benefits': {
    title: 'Why Ceramic Coating Is the Ultimate Shield for Your Vehicle',
    category: 'Paint Protection',
    author: 'Eddie APS Detailing',
    date: 'June 18, 2026',
    imageUrl: '/images/ceramic-coating.jpg',
    readTime: '5 min read',
    content: `
      <p class="lead text-lg text-slate-300 mb-6 leading-relaxed">Ceramic coatings represent the pinnacle of modern automotive surface care. Unlike traditional paste waxes that melt off within a few car washes, a true nano-ceramic coating bonds chemically with your vehicle's factory clear coat, providing a semi-permanent sacrificial barrier.</p>
      
      <h3 class="text-xl font-bold text-white mt-8 mb-4">What Is a Ceramic Coating?</h3>
      <p class="mb-6 leading-relaxed">At its core, a ceramic coating is a liquid polymer consisting of Silicon Dioxide (SiO2) or Titanium Dioxide. When applied by hand, it cures on top of the paint, creating an extremely smooth, glass-like microscopic layer that fills in clearcoat valleys.</p>

      <h3 class="text-xl font-bold text-white mt-8 mb-4">Top 4 Benefits of Ceramic Coating</h3>
      <ul class="list-disc pl-6 mb-8 space-y-3 leading-relaxed">
        <li><strong>Super Hydrophobic Self-Cleaning:</strong> Water sheets off instantly. Dust, mud, and road film have a hard time sticking to the ultra-smooth ceramic surface, making wash days 5x easier.</li>
        <li><strong>Incredible High-Refraction Gloss:</strong> The glass coating reflects light in a parallel fashion, creating a wet look and bringing out deep metallic flakes or dark color shades.</li>
        <li><strong>UV and Oxidation Blockers:</strong> Constant sunlight degrades clear coat causing fading. Ceramic blocks harmful rays, preventing yellowing and paint failure.</li>
        <li><strong>Chemical Resistance:</strong> Neutralizes acidic damage from bird droppings, bug splatter, and environmental sap before they etch into the paint.</li>
      </ul>

      <h3 class="text-xl font-bold text-white mt-8 mb-4">How Long Does It Last?</h3>
      <p class="mb-6 leading-relaxed">Depending on the grade and maintenance, a professional ceramic coating can protect your vehicle from 2 to 5 years. Regular washing with ceramic-safe soaps and annual toppers preserves the hydrophobic properties.</p>
    `
  },
  'leather-seat-care-tips': {
    title: 'Complete Guide to Cleaning and Moisturizing Leather Car Seats',
    category: 'Interior Cleaning',
    author: 'Eddie APS Detailing',
    date: 'May 24, 2026',
    imageUrl: '/images/deep-interior.jpg',
    readTime: '4 min read',
    content: `
      <p class="lead text-lg text-slate-300 mb-6 leading-relaxed">Leather seats provide comfort and premium aesthetics, but they require periodic upkeep to maintain their flexibility and color. Debris, body oils, and UV exposure dry out leather, causing cracks, creases, and discoloration.</p>

      <h3 class="text-xl font-bold text-white mt-8 mb-4">The Professional Leather Care Process</h3>
      <p class="mb-6 leading-relaxed">Wiping seats with a damp cloth isn't enough. Here is how we perform leather restoration at our shop:</p>
      
      <ol class="list-decimal pl-6 mb-8 space-y-3 leading-relaxed">
        <li><strong>Crevice Vacuuming:</strong> Dirt and grit settle in seat seams, acting like sandpaper when sat on. We blow out seams with compressed air and vacuum thoroughly.</li>
        <li><strong>pH-Neutral Cleaner Application:</strong> Strong detergents can strip leather dyes. We spray a balanced cleanser and agitate with a soft horsehair detailing brush to lift dirt from leather pores.</li>
        <li><strong>Dry Microfiber Wipe:</strong> We wipe away the dirty lather immediately to prevent the leather from re-absorbing moisture.</li>
        <li><strong>Essential Leather Conditioning:</strong> We apply a vitamin-rich, water-based conditioner that absorbs deeply into the fibers, maintaining suppleness without leaving a greasy sheen.</li>
      </ol>

      <h3 class="text-xl font-bold text-white mt-8 mb-4">How Often Should You Condition?</h3>
      <p class="mb-6 leading-relaxed">We recommend vacuuming and wiping down leather seats monthly, and applying a deep conditioner every 3 to 4 months to prevent solar cracking.</p>
    `
  }
}

// Fetch dynamic blog data from database API with fallback
const { data: post } = await useFetch(`/api/blog/${slug.value}`, {
  lazy: true,
  default: () => staticPostsCatalog[slug.value] || staticPostsCatalog['ceramic-coating-benefits']
})
</script>

<template>
  <div class="py-20 bg-slate-950 min-h-screen text-slate-200">
    <div v-if="post" class="max-w-4xl mx-auto px-4 sm:px-6">
      
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-xs text-slate-500 mb-8 uppercase tracking-wider font-semibold">
        <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/blog" class="hover:text-white">Blog</NuxtLink>
        <span>/</span>
        <span class="text-slate-300">Article</span>
      </nav>

      <!-- Article Header -->
      <header class="mb-10 space-y-4">
        <span class="inline-block bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-md">
          {{ post.category }}
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {{ post.title }}
        </h1>
        <div class="flex items-center space-x-3 text-xs text-slate-500 font-semibold pt-2">
          <span>By {{ post.author }}</span>
          <span>•</span>
          <span>{{ post.date }}</span>
          <span>•</span>
          <span>{{ post.readTime || '5 min read' }}</span>
        </div>
      </header>

      <!-- Featured Image -->
      <div class="rounded-2xl overflow-hidden shadow-2xl border border-slate-850 h-[300px] sm:h-[450px] mb-12">
        <img
          :src="post.imageUrl"
          :alt="post.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Article Body -->
      <div class="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base mb-16">
        <!-- Render post content HTML safely -->
        <div v-html="post.content"></div>
      </div>

      <!-- CTA Book Footer -->
      <div class="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2">
          <h3 class="text-lg font-bold text-white">Let us restore your vehicle's beauty</h3>
          <p class="text-xs text-slate-400 max-w-md">
            Schedule complete, interior, or ceramic detailing at your doorstep or our shop. Book online now.
          </p>
        </div>
        <NuxtLink
          to="/book"
          class="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors text-sm text-center"
        >
          Book An Appointment
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
