<script setup lang="ts">
import { ref, computed } from 'vue'

const categories = ['All', 'Interior', 'Exterior', 'Paint Correction', 'Engine', 'Headlights']
const activeCategory = ref('All')

// Static fallback gallery items
const staticGalleryItems = [
  // Before / After Comparison Sliders
  {
    id: 1,
    title: 'Leather Seat Steam Restoration',
    type: 'slider',
    category: 'Interior',
    before: '/images/complete-detailing.webp',
    after: '/images/deep-interior.webp'
  },
  {
    id: 2,
    title: 'Swirl Mark Paint Correction',
    type: 'slider',
    category: 'Paint Correction',
    before: '/images/paint-polishing.webp',
    after: '/images/exterior-detailing.webp'
  },
  {
    id: 3,
    title: 'Hazy Headlight UV Restoration',
    type: 'slider',
    category: 'Headlights',
    before: '/images/headlight-restoration.webp',
    after: '/images/ceramic-coating.webp'
  },
  // Standard detailing portfolio images
  {
    id: 4,
    title: 'Deep Carpet Shampooing',
    type: 'image',
    category: 'Interior',
    url: '/images/engine-bay.webp'
  },
  {
    id: 5,
    title: 'Ceramic Coating Reflection',
    type: 'image',
    category: 'Paint Correction',
    url: '/images/ceramic-coating.webp'
  },
  {
    id: 6,
    title: 'Engine Bay Grime Wash',
    type: 'image',
    category: 'Engine',
    url: '/images/luxury-car.webp'
  },
  {
    id: 7,
    title: 'Alloy Wheel Iron Cleanse',
    type: 'image',
    category: 'Exterior',
    url: '/images/wheel-detail.webp'
  },
  {
    id: 8,
    title: 'Door Card Deep Steam Clean',
    type: 'image',
    category: 'Interior',
    url: '/images/exterior-detailing.webp'
  }
]

// Query dynamic database gallery items with local fallback
const { data: galleryItems } = await useFetch('/api/gallery', {
  lazy: true,
  default: () => staticGalleryItems
})

// Filter items based on active tab
const filteredItems = computed(() => {
  if (activeCategory.value === 'All') return galleryItems.value
  return galleryItems.value.filter(item => {
    // Standardize category strings for matching
    const cat = item.category.toLowerCase().replace(' ', '')
    const active = activeCategory.value.toLowerCase().replace(' ', '')
    return cat.includes(active) || active.includes(cat)
  })
})

// Lightbox state for viewing full size standard images
const lightboxImage = ref<string | null>(null)
const lightboxTitle = ref('')

const openLightbox = (url: string, title: string) => {
  lightboxImage.value = url
  lightboxTitle.value = title
}

const closeLightbox = () => {
  lightboxImage.value = null
}
</script>

<template>
  <div class="py-20 bg-slate-950 min-h-screen text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Detailing Portfolio Gallery
        </h1>
        <p class="text-slate-400 text-lg leading-relaxed">
          See the amazing results we have achieved for our clients. Browse through before/after sliders or high-resolution detailing photos.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center justify-center gap-3 mb-16">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border"
          :class="[
            activeCategory === cat
              ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 flex flex-col space-y-4 shadow-xl"
        >
          <!-- Interactive slider type -->
          <div v-if="item.type === 'slider'">
            <BeforeAfterSlider
              :before="item.before"
              :after="item.after"
              beforeLabel="Before Detail"
              afterLabel="After Detail"
            />
          </div>

          <!-- Standard zoomable image type -->
          <div
            v-else
            class="relative h-[250px] sm:h-[350px] rounded-xl overflow-hidden cursor-zoom-in group"
            @click="openLightbox(item.url, item.title)"
          >
            <img
              :src="item.url"
              :alt="item.title"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <span class="bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-lg text-white font-bold text-xs">
                🔍 Zoom Image
              </span>
            </div>
          </div>

          <!-- Meta -->
          <div class="flex items-center justify-between px-2 pt-1">
            <h3 class="text-sm font-bold text-white tracking-wide">{{ item.title }}</h3>
            <span class="text-xs font-semibold px-2.5 py-1 bg-slate-800 border border-slate-750 text-blue-400 rounded-md">
              {{ item.category }}
            </span>
          </div>
        </div>
      </div>

      <!-- No Items State -->
      <div v-if="!filteredItems.length" class="text-center py-20 text-slate-500">
        No gallery items found for "{{ activeCategory }}"
      </div>
    </div>

    <!-- Lightbox Overlay -->
    <transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="lightboxImage"
        class="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 cursor-zoom-out"
        @click="closeLightbox"
      >
        <button
          @click.stop="closeLightbox"
          class="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center font-bold"
          aria-label="Close viewer"
        >
          ✕
        </button>
        <div class="max-w-5xl max-h-[80vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl relative">
          <img
            :src="lightboxImage"
            :alt="lightboxTitle"
            class="object-contain max-h-[80vh] w-full"
          />
        </div>
        <p class="text-white text-sm font-bold mt-4 tracking-wider">{{ lightboxTitle }}</p>
      </div>
    </transition>
  </div>
</template>
