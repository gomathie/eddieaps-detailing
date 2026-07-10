<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

// Extensive static fallback catalog of services
const staticCatalog: Record<string, any> = {
  'complete-detailing': {
    name: 'Complete Detailing',
    description: 'The ultimate restoration package. Full deep clean of both interior and exterior including wax, polishing, and sanitization.',
    basePrice: 250,
    duration: '4-6 hours',
    imageUrl: '/images/complete-detailing.jpg',
    benefits: [
      'Increases vehicle resale value significantly',
      'Removes 99.9% of interior bacteria, germs, and odors',
      'Provides a 12-month weather-resistant protective paint layer',
      'Restores dashboard and plastic trim back to factory matte shine'
    ],
    process: [
      'Step 1: Multi-stage exterior hand foam pre-wash and wash',
      'Step 2: Clay bar treatment and iron decontamination to pull out embedded particles',
      'Step 3: High-gloss machine paint polish to remove light swirls and restore reflection',
      'Step 4: Hot water extraction shampooing of all carpets, seats, and floor mats',
      'Step 5: Steam cleaning of dashboard, door cards, AC vents, and leather conditioning',
      'Step 6: Hand application of synthetic paint sealant and final inspection'
    ],
    faqs: [
      { q: "Is complete detailing suitable for all cars?", a: "Yes, we adjust our compounds, brush bristles, and steam heat depending on whether you drive a luxury sedan, classic car, or a rugged pickup truck." },
      { q: "Does this remove scratches?", a: "It removes light swirl marks and enhances paint reflection. For deep scratches, we recommend our Paint Polishing/Correction service." }
    ]
  },
  'deep-interior': {
    name: 'Deep Interior Detailing',
    description: 'Thorough steam cleaning, shampooing, leather conditioning, and stain removal for a factory-fresh cabin experience.',
    basePrice: 150,
    duration: '3-4 hours',
    imageUrl: '/images/deep-interior.jpg',
    benefits: [
      'Eliminates deeply embedded pet hair, coffee stains, and mud',
      'Disinfects high-touch areas (steering, dials, seatbelts)',
      'Hydrates and protects leather seats against cracking',
      'Leaves a clean, neutral scent without artificial chemicals'
    ],
    process: [
      'Step 1: Deep dry vacuum and air-purge of crevices to dislodge debris',
      'Step 2: Dry brushing and scrubbing of carpets, roof lining, and seats',
      'Step 3: Steam sanitization of all surfaces, including vents and cup holders',
      'Step 4: Hot water carpet extraction to lift embedded stains',
      'Step 5: Leather cleaning with premium pH-neutral cleanser, followed by moisturizer',
      'Step 6: Odor neutralizer treatment and streak-free window cleaning'
    ],
    faqs: [
      { q: "Will my seats be wet after cleaning?", a: "We use high-power extraction machinery that pulls out 95% of the water. Your seats will be fully dry within 2 to 4 hours." },
      { q: "Can you guarantee all stains will be removed?", a: "While we lift almost all organic dirt, grease, and mud, some chemical stains or dye transfers (like ink or blood) might be permanent. We perform a spot check first." }
    ]
  },
  'exterior-detailing': {
    name: 'Exterior Detailing',
    description: 'Premium hand wash, clay bar treatment, iron decontamination, and high-gloss paint sealing or wax application.',
    basePrice: 120,
    duration: '2-3 hours',
    imageUrl: '/images/exterior-detailing.jpg',
    benefits: [
      'Creates a durable hydrophobic paint shield that repels rain and dirt',
      'Saves clearcoat paint from acid rain, bird droppings, and UV UV rays',
      'Cleans wheels, brake dust, and caliper grime extensively',
      'Restores tired trim back to deep dark finish'
    ],
    process: [
      'Step 1: Wheel barrels, calipers, and arches cleaned using iron-removing gel',
      'Step 2: High-density snow foam pre-wash to lift abrasive dirt particles safely',
      'Step 3: Two-bucket hand wash with scratch-free microfibers',
      'Step 4: Clay bar paint massage to pull off grit and roughness',
      'Step 5: Compressed air blow dry of mirrors, panel gaps, and trunk channels',
      'Step 6: Hand buffing of a hydrophobic ceramic spray sealer'
    ],
    faqs: [
      { q: "Do you use automatic brush washes?", a: "Never. We wash vehicles entirely by hand using the two-bucket method and scratch-free wash mitts to prevent swirl marks." }
    ]
  },
  'paint-polishing': {
    name: 'Paint Polishing & Correction',
    description: 'Remove swirl marks, minor scratches, and oxidation to restore deep color, clarity, and mirror-like reflections.',
    basePrice: 300,
    duration: '5-8 hours',
    imageUrl: '/images/paint-polishing.jpg',
    benefits: [
      'Removes 80-90% of clear coat swirl marks and light spider-web scratches',
      'Restores dull, hazy, or oxidized paint back to deep, glassy gloss',
      'Creates a flat paint texture, optimizing reflection angles',
      'Prepares paint for long-term ceramic coating integration'
    ],
    process: [
      'Step 1: Multi-stage wash, iron decontamination, and clay bar scrub',
      'Step 2: Paint depth gauge reading to verify clearcoat thickness',
      'Step 3: Sensitive trims, badges, and rubbers taped off for safety',
      'Step 4: Compounding phase using a cutting pad to level scratches',
      'Step 5: Polishing phase using a finishing pad to maximize gloss and clarity',
      'Step 6: Panel wipe down to remove residues, followed by sealant application'
    ],
    faqs: [
      { q: "Will this fix deep scratches?", a: "If a scratch has gone through the clear coat into the primer (e.g. if you can catch it with a fingernail), polishing won't fully remove it. It will, however, make the edges rounder and less visible." }
    ]
  }
}

// State for FAQ toggling
const openFaqIndex = ref<number | null>(null)
const toggleFaq = (idx: number) => {
  openFaqIndex.value = openFaqIndex.value === idx ? null : idx
}

// Fetch dynamic service from API or fallback
const { data: service } = await useFetch(`/api/services/${slug.value}`, {
  lazy: true,
  default: () => staticCatalog[slug.value] || staticCatalog['complete-detailing']
})
</script>

<template>
  <div class="py-20 bg-slate-950 min-h-screen text-slate-200">
    <div v-if="service" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-xs text-slate-500 mb-8 uppercase tracking-wider font-semibold">
        <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/services" class="hover:text-white">Services</NuxtLink>
        <span>/</span>
        <span class="text-slate-300">{{ service.name }}</span>
      </nav>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Text details -->
        <div>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none mb-6">
            {{ service.name }}
          </h1>

          <div class="flex items-center space-x-6 mb-8 text-sm">
            <div class="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
              <span class="text-blue-500">⏰</span>
              <span class="font-bold text-white">{{ service.duration }}</span>
            </div>
            <div class="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
              <span class="text-blue-500">💰</span>
              <span>Starting at <strong class="text-white text-base">${{ service.basePrice }}</strong></span>
            </div>
          </div>

          <p class="text-slate-400 leading-relaxed text-base mb-10">
            {{ service.description }}
          </p>

          <!-- Benefits -->
          <div class="mb-10">
            <h2 class="text-lg font-bold text-white mb-4">Key Benefits</h2>
            <ul class="space-y-3">
              <li
                v-for="benefit in service.benefits"
                :key="benefit"
                class="flex items-start text-sm text-slate-300 leading-relaxed"
              >
                <span class="text-emerald-500 mr-3 mt-0.5">✓</span>
                {{ benefit }}
              </li>
            </ul>
          </div>

          <!-- Process -->
          <div class="mb-10">
            <h2 class="text-lg font-bold text-white mb-4">The Detailing Process</h2>
            <ul class="space-y-4">
              <li
                v-for="step in service.process"
                :key="step"
                class="bg-slate-900 border border-slate-800/60 p-4 rounded-xl text-sm leading-relaxed"
              >
                {{ step }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Sticky Visual & Booking box -->
        <div class="lg:sticky lg:top-28 space-y-8">
          <!-- Main image -->
          <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 h-[300px] md:h-[400px]">
            <img
              :src="service.imageUrl"
              :alt="service.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Booking Callout Card -->
          <div class="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h3 class="text-xl font-bold text-white mb-3">Ready for a showroom shine?</h3>
            <p class="text-sm text-slate-400 mb-6 leading-relaxed">
              Book this service online in under 2 minutes. We will bring our fully self-powered mobile detailing truck to your driveway or confirm a time at our facility.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink
                :to="`/book?service=${encodeURIComponent(service.name)}`"
                class="flex-1 text-center py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors text-sm"
              >
                Book This Service
              </NuxtLink>
              <NuxtLink
                to="/quote"
                class="flex-1 text-center py-3 bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-800 transition-colors text-sm"
              >
                Request Custom Quote
              </NuxtLink>
            </div>
          </div>

          <!-- Service FAQs -->
          <div v-if="service.faqs && service.faqs.length" class="space-y-3">
            <h3 class="text-base font-bold text-white mb-2">Service FAQs</h3>
            <div
              v-for="(faq, idx) in service.faqs"
              :key="idx"
              class="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden"
            >
              <button
                @click="toggleFaq(idx)"
                class="w-full px-5 py-4 text-left flex justify-between items-center text-white focus:outline-none"
              >
                <span class="font-semibold text-xs sm:text-sm">{{ faq.q }}</span>
                <span class="text-blue-500 text-sm transition-transform" :class="{ 'rotate-45': openFaqIndex === idx }">
                  +
                </span>
              </button>
              <div
                v-show="openFaqIndex === idx"
                class="px-5 pb-4 text-xs text-slate-400 border-t border-slate-800/40 pt-3 leading-relaxed"
              >
                {{ faq.a }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
