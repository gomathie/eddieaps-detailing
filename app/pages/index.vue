<script setup lang="ts">
import { ref } from 'vue'

// Local static fallback data for services
const staticServices = [
  {
    slug: 'complete-detailing',
    name: 'Complete Detailing',
    description: 'The ultimate restoration package. Full deep clean of both interior and exterior including wax, polishing, and sanitization.',
    basePrice: 250,
    duration: '4-6 hours',
    imageUrl: '/images/complete-detailing.webp'
  },
  {
    slug: 'deep-interior',
    name: 'Deep Interior Detailing',
    description: 'Thorough steam cleaning, shampooing, leather conditioning, and stain removal for a factory-fresh cabin experience.',
    basePrice: 150,
    duration: '3-4 hours',
    imageUrl: '/images/deep-interior.webp'
  },
  {
    slug: 'exterior-detailing',
    name: 'Exterior Detailing',
    description: 'Premium hand wash, clay bar treatment, iron decontamination, and high-gloss paint sealing or wax application.',
    basePrice: 120,
    duration: '2-3 hours',
    imageUrl: '/images/exterior-detailing.webp'
  },
  {
    slug: 'paint-polishing',
    name: 'Paint Polishing',
    description: 'Remove swirl marks, minor scratches, and oxidation to restore deep color, clarity, and mirror-like reflections.',
    basePrice: 300,
    duration: '5-8 hours',
    imageUrl: '/images/paint-polishing.webp'
  }
]

// Dynamic fetch with static fallback
const { data: services } = await useFetch('/api/services', {
  lazy: true,
  default: () => staticServices
})

// FAQ section list
const faqs = ref([
  {
    question: "Do you need access to water or electricity for mobile detailing?",
    answer: "No! Our mobile detailing unit is fully equipped with an onboard water tank and generator, allowing us to perform full detailing anywhere—whether at your home, office, or an apartment parking lot.",
    isOpen: false
  },
  {
    question: "What is the difference between stationed and mobile detailing?",
    answer: "Mobile detailing brings our services directly to your driveway for maximum convenience. Stationed detailing takes place at our specialized facility, which is ideal for complex, multi-day services like paint correction and advanced ceramic coatings that require controlled environments.",
    isOpen: false
  },
  {
    question: "How often should I get my vehicle detailed?",
    answer: "We recommend a professional detail at least twice a year to preserve the vehicle's paint, seal the exterior surfaces against weather elements, and keep the interior clean, sanitized, and odor-free.",
    isOpen: false
  },
  {
    question: "How long does a detailing session take?",
    answer: "It depends on the package and the vehicle's condition. Interior or exterior details typically take 2-4 hours, while our Complete Detailing package takes 4-6 hours. Paint correction and protection packages can take a full day or more.",
    isOpen: false
  }
])

const toggleFaq = (index: number) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

// Contact form fields
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})
const formStatus = ref({
  loading: false,
  success: false,
  error: ''
})

const submitContactForm = async () => {
  formStatus.value.loading = true
  formStatus.value.error = ''
  try {
    const res = await $fetch('/api/messages', {
      method: 'POST',
      body: contactForm.value
    })
    formStatus.value.success = true
    contactForm.value = { name: '', email: '', phone: '', message: '' }
  } catch (err: any) {
    formStatus.value.error = err.data?.message || 'Something went wrong. Please try again.'
  } finally {
    formStatus.value.loading = false
  }
}
</script>

<template>
  <div>
    <!-- 1. Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      <!-- Hero background image -->
      <img
        src="/images/hero-detailing.webp"
        alt="Professional auto detailing"
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950 z-0"></div>

      <!-- Background gradient layout -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.2)_0%,rgba(15,23,42,0.6)_80%)] z-0"></div>
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 uppercase tracking-wider">
          ★ Professional Auto Care
        </span>
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
          Premium Mobile & <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
            Stationed Auto Detailing
          </span>
        </h1>
        <p class="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 font-medium leading-relaxed">
          Restore, protect, and preserve your vehicle's beauty. Delivered directly to your doorstep or detailed at our professional shop.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <NuxtLink
            to="/book"
            class="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 text-base"
          >
            Book Appointment
          </NuxtLink>
          <NuxtLink
            to="/quote"
            class="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-800 backdrop-blur transition-all duration-200 text-base"
          >
            Get Free Quote
          </NuxtLink>
          <a
            href="tel:0595118973"
            class="w-full sm:w-auto px-8 py-4 bg-transparent text-slate-300 hover:text-white font-bold transition-all duration-200 text-base flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </a>
        </div>

        <!-- Trust Badges -->
        <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-10 border-t border-slate-900/60 text-slate-400 text-sm">
          <div>
            <div class="text-2xl font-bold text-white mb-1">100%</div>
            <div>Satisfaction Guarantee</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-white mb-1">Eco</div>
            <div>Friendly Products</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-white mb-1">Mobile</div>
            <div>We Come To You</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-white mb-1">5 ★</div>
            <div>Top Rated Detailing</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. About Section -->
    <section class="py-24 bg-slate-900 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Text column -->
          <div>
            <span class="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">About Us</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Eddie APS Detailing: Exceptional Results, Unmatched Convenience
            </h2>
            <p class="text-slate-350 leading-relaxed mb-6">
              Eddie APS Detailing was founded on a simple vision: to provide busy vehicle owners with a convenient, eco-friendly, and ultra-premium detailing service. We believe a car is more than a utility—it is a valuable investment that deserves pristine upkeep.
            </p>
            <p class="text-slate-350 leading-relaxed mb-8">
              Whether you need deep interior sanitization, exterior paint correction, or long-lasting ceramic protection, our skilled professionals use advanced tools and premium materials to deliver showroom results. We service your car directly at your location or at our stationed facility.
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  ✓
                </div>
                <span class="text-sm font-semibold text-white">Licensed & Insured</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  ✓
                </div>
                <span class="text-sm font-semibold text-white">Advanced Equipment</span>
              </div>
            </div>
          </div>

          <!-- Image/Visual column -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-3 scale-98 opacity-20 blur-lg"></div>
            <img
              src="/images/engine-bay.webp"
              alt="Detailing luxury car interior"
              class="relative z-10 w-full h-[400px] object-cover rounded-2xl shadow-xl border border-slate-800"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Services Section -->
    <section class="py-24 bg-slate-950 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">Our Services</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Professional Auto Detailing Packages
          </h2>
          <p class="text-slate-400">
            Select a tailored plan that matches your vehicle's requirements. We offer specialized services for all car sizes.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="service in services"
            :key="service.slug"
            class="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col group"
          >
            <div class="h-48 overflow-hidden relative">
              <img
                :src="service.imageUrl"
                :alt="service.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-4 right-4 bg-slate-900/90 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-md">
                {{ service.duration }}
              </div>
            </div>
            <div class="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 class="text-lg font-bold text-white mb-2">{{ service.name }}</h3>
                <p class="text-sm text-slate-400 leading-relaxed mb-4">
                  {{ service.description }}
                </p>
              </div>
              <div class="pt-4 border-t border-slate-800/60 flex items-center justify-end">
                <NuxtLink
                  :to="`/services/${service.slug}`"
                  class="text-xs font-bold text-blue-500 group-hover:text-blue-400 flex items-center gap-1"
                >
                  View Details
                  <span>→</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink
            to="/services"
            class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 rounded-xl transition-colors text-sm font-semibold"
          >
            Explore All Services
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. Why Choose Us -->
    <section class="py-24 bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">Why Eddie APS</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            The Detailing Service Designed For You
          </h2>
          <p class="text-slate-400">
            We focus on convenience, exceptional quality, and customer satisfaction. Here is what sets us apart.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-slate-950 p-8 rounded-2xl border border-slate-900 hover:border-blue-500/30 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center mb-6">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Ultimate Convenience</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              We bring our fully self-powered mobile detailing truck to your driveway, office parking lot, or any location. You sit back; we make it shine.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-slate-950 p-8 rounded-2xl border border-slate-900 hover:border-blue-500/30 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center mb-6">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Premium Care Products</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              We use only high-end soaps, clay bars, compound polishes, and paint sealants to preserve your car's exterior clear coat and protect the delicate interior.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-slate-950 p-8 rounded-2xl border border-slate-900 hover:border-blue-500/30 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center mb-6">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Eco-Friendly Process</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              We employ water conservation cleaning techniques and biodegradable cleaning detergents to protect local storm drains while delivering spotless cleaning.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Interactive Before/After Gallery Highlight -->
    <section class="py-24 bg-slate-950 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">Gallery Showcase</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Witness Incredible Restorations
            </h2>
            <p class="text-slate-400 leading-relaxed mb-8">
              Drag the comparison slider on the right to see how we restore and repair dirty seats, paint swirl marks, and cloudy headlights back to showroom conditions.
            </p>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <span class="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">1</span>
                <span class="text-sm text-slate-300 font-medium">Headlight oxidation removal</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">2</span>
                <span class="text-sm text-slate-300 font-medium">Deep interior leather restoration</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">3</span>
                <span class="text-sm text-slate-300 font-medium">Paint scratch and swirl polishing</span>
              </div>
            </div>
            <div class="mt-8">
              <NuxtLink
                to="/gallery"
                class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors text-sm"
              >
                View Full Gallery
              </NuxtLink>
            </div>
          </div>

          <!-- Slider Component -->
          <div>
            <BeforeAfterSlider
              before="/images/complete-detailing.webp"
              after="/images/exterior-detailing.webp"
              beforeLabel="Dirty / Swirly"
              afterLabel="Eddie APS Finish"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Booking Process Steps -->
    <section class="py-24 bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">The Process</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            How to Book in 4 Simple Steps
          </h2>
          <p class="text-slate-400">
            Booking professional detailing has never been easier.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <!-- Step 1 -->
          <div class="text-center relative">
            <div class="w-16 h-16 rounded-full bg-blue-600/10 border-2 border-blue-500 text-blue-400 flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-md shadow-blue-500/5">
              1
            </div>
            <h3 class="text-base font-bold text-white mb-2">Select a Service</h3>
            <p class="text-xs text-slate-400 leading-relaxed px-4">
              Choose from complete, interior, exterior, or specialty detailing packages.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center relative">
            <div class="w-16 h-16 rounded-full bg-blue-600/10 border-2 border-blue-500 text-blue-400 flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-md shadow-blue-500/5">
              2
            </div>
            <h3 class="text-base font-bold text-white mb-2">Pick Date & Time</h3>
            <p class="text-xs text-slate-400 leading-relaxed px-4">
              Select your preferred day and hourly slot. We fit around your calendar.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center relative">
            <div class="w-16 h-16 rounded-full bg-blue-600/10 border-2 border-blue-500 text-blue-400 flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-md shadow-blue-500/5">
              3
            </div>
            <h3 class="text-base font-bold text-white mb-2">Provide Address</h3>
            <p class="text-xs text-slate-400 leading-relaxed px-4">
              Tell us where your vehicle is parked or book a stationed slot at our shop.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="text-center relative">
            <div class="w-16 h-16 rounded-full bg-blue-600/10 border-2 border-blue-500 text-blue-400 flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-md shadow-blue-500/5">
              4
            </div>
            <h3 class="text-base font-bold text-white mb-2">Enjoy The Shine!</h3>
            <p class="text-xs text-slate-400 leading-relaxed px-4">
              Our experts complete the detailing, leaving your vehicle looking and smelling brand new.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. FAQ Section -->
    <section class="py-24 bg-slate-950">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-16">
          <span class="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">FAQ</span>
          <h2 class="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden transition-colors"
          >
            <button
              @click="toggleFaq(idx)"
              class="w-full px-6 py-5 text-left flex justify-between items-center text-white focus:outline-none"
            >
              <span class="font-semibold text-sm sm:text-base">{{ faq.question }}</span>
              <span class="text-blue-500 text-lg transition-transform" :class="{ 'rotate-45': faq.isOpen }">
                +
              </span>
            </button>
            <div
              v-show="faq.isOpen"
              class="px-6 pb-5 text-sm text-slate-400 border-t border-slate-800/40 pt-4 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Contact Section -->
    <section id="contact" class="py-24 bg-slate-900 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Info Column -->
          <div>
            <span class="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">Contact</span>
            <h2 class="text-3xl font-extrabold text-white mb-6">Let's Discuss Your Vehicle</h2>
            <p class="text-slate-350 leading-relaxed mb-8">
              Have questions about a specific stain, ceramic coating, or need to schedule multiple vehicles? Contact us directly. We answer within an hour.
            </p>

            <div class="space-y-6 text-sm text-slate-300">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  ☏
                </div>
                <div>
                  <div class="font-bold text-white">Call Us</div>
                  <a href="tel:0595118973" class="hover:text-blue-400 transition-colors">0595118973</a> / 
                  <a href="tel:0591357411" class="hover:text-blue-400 transition-colors">0591357411</a>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  ✉
                </div>
                <div>
                  <div class="font-bold text-white">Email Address</div>
                  <a href="mailto:info@eddieapsdetailing.com" class="hover:text-blue-400 transition-colors">info@eddieapsdetailing.com</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Column -->
          <div class="bg-slate-950 p-8 rounded-2xl border border-slate-800">
            <h3 class="text-lg font-bold text-white mb-6">Send A Message</h3>
            <form @submit.prevent="submitContactForm" class="space-y-4">
              <div>
                <label for="c-name" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                <input
                  id="c-name"
                  v-model="contactForm.name"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="c-email" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                  <input
                    id="c-email"
                    v-model="contactForm.email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label for="c-phone" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                  <input
                    id="c-phone"
                    v-model="contactForm.phone"
                    type="tel"
                    required
                    placeholder="0595118973"
                    class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label for="c-msg" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="c-msg"
                  v-model="contactForm.message"
                  required
                  rows="4"
                  placeholder="How can we help you?"
                  class="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="formStatus.loading"
                class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                <span>{{ formStatus.loading ? 'Sending...' : 'Send Message' }}</span>
              </button>

              <p v-if="formStatus.success" class="text-sm text-emerald-400 font-semibold text-center mt-2">
                Thank you! Your message was sent. We will get back to you shortly.
              </p>
              <p v-if="formStatus.error" class="text-sm text-rose-400 font-semibold text-center mt-2">
                {{ formStatus.error }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
