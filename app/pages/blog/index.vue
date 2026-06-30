<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = ['All', 'Car Care Tips', 'Interior Cleaning', 'Paint Protection', 'Detailing Advice', 'Vehicle Maintenance']

// Static fallback blog posts for SEO and offline stability
const staticPosts = [
  {
    slug: 'ceramic-coating-benefits',
    title: 'Why Ceramic Coating Is the Ultimate Shield for Your Vehicle',
    excerpt: 'Discover how nano-ceramic technology bonds with your paint to block UV rays, chemical stains, and bird droppings while providing an intense hydrophobic gloss.',
    category: 'Paint Protection',
    author: 'Eddie APS Detailing',
    date: 'June 18, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read'
  },
  {
    slug: 'leather-seat-care-tips',
    title: 'Complete Guide to Cleaning and Moisturizing Leather Car Seats',
    excerpt: 'Avoid cracks and fading. Learn the step-by-step process of cleaning leather using pH-neutral cleansers, horsehair brushes, and rich nutrient conditioners.',
    category: 'Interior Cleaning',
    author: 'Eddie APS Detailing',
    date: 'May 24, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read'
  },
  {
    slug: 'mobile-detailing-checklist',
    title: 'How to Prepare Your Car for a Mobile Detailing Appointment',
    excerpt: 'Make the detailing session faster and more effective. Here is our simple checklist of things to clear from your vehicle before our mobile team arrives.',
    category: 'Detailing Advice',
    author: 'Eddie APS Detailing',
    date: 'April 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min read'
  },
  {
    slug: 'engine-bay-safety-cleaning',
    title: 'Is It Safe to Wash Your Engine Bay? Common Myths Debunked',
    excerpt: 'An clean engine runs cooler and makes maintenance simpler. We explain how professionals shield electrical components and steam clean safely.',
    category: 'Vehicle Maintenance',
    author: 'Eddie APS Detailing',
    date: 'March 05, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read'
  }
]

// Query D1 API for blogs, falling back to staticPosts
const { data: posts } = await useFetch('/api/blog', {
  lazy: true,
  default: () => staticPosts
})

// Client-side search and category filtering
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesCategory = selectedCategory.value === 'All' || post.category === selectedCategory.value
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div class="py-20 bg-slate-950 min-h-screen text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Eddie\'s Detailing Advice & Tips
        </h1>
        <p class="text-slate-400 text-lg leading-relaxed">
          Expert articles on how to clean, protect, and maintain your vehicle in pristine condition.
        </p>
      </div>

      <!-- Controls: Search & Categories -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16 items-center">
        <!-- Search -->
        <div class="lg:col-span-1">
          <label for="b-search" class="sr-only">Search articles</label>
          <input
            id="b-search"
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <!-- Categories List -->
        <div class="lg:col-span-3 flex flex-wrap gap-2 justify-start lg:justify-end">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-4 py-2 rounded-lg text-xs font-semibold border transition-all"
            :class="[
              selectedCategory === cat
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-if="filteredPosts.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article
          v-for="post in filteredPosts"
          :key="post.slug"
          class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col group"
        >
          <!-- Image banner -->
          <div class="h-64 overflow-hidden relative">
            <img
              :src="post.imageUrl"
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-350"
            />
            <span class="absolute top-4 left-4 bg-blue-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-md">
              {{ post.category }}
            </span>
          </div>

          <!-- Description info -->
          <div class="p-8 flex-grow flex flex-col justify-between">
            <div class="space-y-4">
              <div class="flex items-center space-x-2 text-xs text-slate-500 font-semibold">
                <span>By {{ post.author }}</span>
                <span>•</span>
                <span>{{ post.date }}</span>
                <span>•</span>
                <span>{{ post.readTime || '5 min read' }}</span>
              </div>
              <h2 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                {{ post.title }}
              </h2>
              <p class="text-sm text-slate-400 leading-relaxed">
                {{ post.excerpt }}
              </p>
            </div>

            <div class="pt-6 mt-6 border-t border-slate-800/60">
              <NuxtLink
                :to="`/blog/${post.slug}`"
                class="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1.5"
              >
                Read Article
                <span>→</span>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 text-slate-500">
        No articles found matching "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>
