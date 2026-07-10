<script setup lang="ts">
const staticServices = [
  {
    slug: 'complete-detailing',
    name: 'Complete Detailing',
    description: 'The ultimate restoration package. Full deep clean of both interior and exterior including wax, polishing, and sanitization.',
    basePrice: 250,
    duration: '4-6 hours',
    imageUrl: '/images/complete-detailing.jpg',
    highlights: ['Deep carpet extraction', 'Clay bar decontamination', '12-month paint sealant', 'Engine bay light wipe']
  },
  {
    slug: 'deep-interior',
    name: 'Deep Interior Detailing',
    description: 'Thorough steam cleaning, shampooing, leather conditioning, and stain removal for a factory-fresh cabin experience.',
    basePrice: 150,
    duration: '3-4 hours',
    imageUrl: '/images/deep-interior.jpg',
    highlights: ['Hot water extraction', 'Steam disinfection', 'Leather cleaning & protection', 'Dashboard & console scrub']
  },
  {
    slug: 'exterior-detailing',
    name: 'Exterior Detailing',
    description: 'Premium hand wash, clay bar treatment, iron decontamination, and high-gloss paint sealing or wax application.',
    basePrice: 120,
    duration: '2-3 hours',
    imageUrl: '/images/exterior-detailing.jpg',
    highlights: ['Foam cannon pre-soak', 'Wheel barrel & caliper clean', 'Clay bar treatment', 'Hydrophobic paint sealer']
  },
  {
    slug: 'engine-detailing',
    name: 'Engine Detailing',
    description: 'Safe removal of grease, grime, and debris from your engine bay, followed by a dry protective dressing.',
    basePrice: 80,
    duration: '1-2 hours',
    imageUrl: '/images/luxury-car.jpg',
    highlights: ['Electrical component shielding', 'Degrease & steam spray', 'High-temp protective dressing', 'Corrosion inspection']
  },
  {
    slug: 'paint-polishing',
    name: 'Paint Polishing',
    description: 'Remove swirl marks, minor scratches, and oxidation to restore deep color, clarity, and mirror-like reflections.',
    basePrice: 300,
    duration: '5-8 hours',
    imageUrl: '/images/paint-polishing.jpg',
    highlights: ['Dual-action machine polish', 'Swirl & halo mark removal', 'High-refraction gloss enhancement', 'Wax/sealant base coat']
  },
  {
    slug: 'headlight-restoration',
    name: 'Headlight Restoration',
    description: 'Restore faded, hazy, or yellowed headlights to crystal clarity. Enhances appearance and night driving safety.',
    basePrice: 60,
    duration: '1-1.5 hours',
    imageUrl: '/images/headlight-restoration.jpg',
    highlights: ['Multi-stage wet sanding', 'High-speed rotary polish', 'UV protective clear coat sealant', 'Lumen output inspection']
  },
  {
    slug: 'waxing',
    name: 'Waxing & Paint Sealing',
    description: 'Premium hand-applied carnauba wax or synthetic polymer paint sealant for deep gloss and seasonal weather protection.',
    basePrice: 100,
    duration: '2 hours',
    imageUrl: '/images/exterior-detailing.jpg',
    highlights: ['Hand carnauba application', 'Synthetic sealant layering', 'Gloss & depth enhancement', '3-6 months protection']
  },
  {
    slug: 'paint-protection',
    name: 'Ceramic Paint Protection',
    description: 'Advanced nano-ceramic coatings that chemical bond with your clearcoat, creating a durable hydrophobic shield.',
    basePrice: 400,
    duration: '6-12 hours',
    imageUrl: '/images/ceramic-coating.jpg',
    highlights: ['Multi-year nano coating', 'Intense water sheeting', 'Anti-graffiti & UV shield', 'Scratch resistance barrier']
  }
]

const { data: services } = await useFetch('/api/services', {
  lazy: true,
  default: () => staticServices
})
</script>

<template>
  <div class="py-20 bg-slate-950 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="text-center max-w-3xl mx-auto mb-20">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Our Detailing Packages
        </h1>
        <p class="text-slate-400 text-lg leading-relaxed">
          From a basic refresh to extensive paint correction, we offer premium mobile and stationed services for every vehicle class.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.slug"
          class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700/80 transition-all duration-300 flex flex-col group"
        >
          <!-- Image -->
          <div class="h-56 overflow-hidden relative">
            <img
              :src="service.imageUrl"
              :alt="service.name"
              class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
            <div class="absolute top-4 right-4 bg-slate-900/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-800">
              {{ service.duration }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 flex-grow flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {{ service.name }}
              </h2>
              <p class="text-sm text-slate-400 leading-relaxed mb-6">
                {{ service.description }}
              </p>

              <!-- Highlights list -->
              <ul class="space-y-2 mb-8">
                <li
                  v-for="hl in (service.highlights || ['Premium materials used', 'Detailed clean', 'Satisfaction guarantee'])"
                  :key="hl"
                  class="flex items-center text-xs text-slate-300"
                >
                  <span class="text-blue-500 mr-2 font-bold">✓</span>
                  {{ hl }}
                </li>
              </ul>
            </div>

            <!-- Footer / CTA -->
            <div class="pt-6 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span class="text-xs text-slate-500 block uppercase tracking-wider font-semibold">Starting at</span>
                <span class="text-2xl font-black text-white">${{ service.basePrice }}</span>
              </div>
              <div class="flex space-x-3">
                <NuxtLink
                  :to="`/services/${service.slug}`"
                  class="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                >
                  Details
                </NuxtLink>
                <NuxtLink
                  :to="`/book?service=${encodeURIComponent(service.name)}`"
                  class="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md hover:shadow-blue-500/10 transition-all duration-200"
                >
                  Book Now
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
