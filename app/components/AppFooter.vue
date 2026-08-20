<script setup lang="ts">
import type { SocialLink } from '#shared/types'

// Managed from the admin portal; the footer stays empty until links are added.
// server:false keeps this out of the prerender payload — most routes are
// prerendered without D1 access, and a baked-in empty array would be reused on
// hydration, so newly added links would never show up.
const { data: socials } = await useFetch('/api/social-links', {
  server: false,
  lazy: true,
  default: (): SocialLink[] => [],
})
</script>

<template>
  <footer class="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-900">
        <!-- Brand Info -->
        <div>
          <NuxtLink to="/" class="flex items-center gap-2.5 mb-4">
            <img src="/logo-wordmark-dark.svg" alt="Eddie APS Detailing" class="h-10 w-auto max-w-full" >
          </NuxtLink>
          <p class="text-sm leading-relaxed mb-6">
            Providing high-quality mobile and stationed auto detailing services. Restoring and protecting your vehicle's beauty wherever you are.
          </p>
          <div v-if="socials.length" class="flex flex-wrap gap-4">
            <a
              v-for="social in socials"
              :key="social.id"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              :title="social.label"
              class="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <SocialIcon :platform="social.platform" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink to="/" class="hover:text-white transition-colors duration-250">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="hover:text-white transition-colors duration-250">All Services</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/gallery" class="hover:text-white transition-colors duration-250">Before & After Gallery</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="hover:text-white transition-colors duration-250">Detailing Blog</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-white transition-colors duration-250">About Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-white transition-colors duration-250">Contact</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/book" class="hover:text-white transition-colors duration-250">Book Online</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/quote" class="hover:text-white transition-colors duration-250">Get a Quote</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Our Services</h4>
          <ul class="space-y-3 text-sm">
            <li><NuxtLink to="/services/complete-detailing" class="hover:text-white transition-colors">Complete Detailing</NuxtLink></li>
            <li><NuxtLink to="/services/deep-interior" class="hover:text-white transition-colors">Deep Interior Detailing</NuxtLink></li>
            <li><NuxtLink to="/services/exterior" class="hover:text-white transition-colors">Exterior Detailing</NuxtLink></li>
            <li><NuxtLink to="/services/paint-polishing" class="hover:text-white transition-colors">Paint Polishing</NuxtLink></li>
            <li><NuxtLink to="/services/paint-protection" class="hover:text-white transition-colors">Paint Protection & Waxing</NuxtLink></li>
            <li><NuxtLink to="/services/headlight-restoration" class="hover:text-white transition-colors">Headlight Restoration</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact & Hours -->
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Get In Touch</h4>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <a href="tel:0595118973" class="block hover:text-white transition-colors">0595118973 (Primary)</a>
                <a href="tel:0591357411" class="block hover:text-white transition-colors">0591357411 (Secondary)</a>
              </div>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Mobile services directly to your home/office, or visit our stationed facility.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Mon - Sat: 7:00 AM - 7:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright & Local Schema -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
        <p>© 2026 Eddie APS Detailing. All rights reserved.</p>
        <p>
          Built, and maintained by
          <a
            href="https://www.linkedin.com/in/mathias-lago/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-300 hover:text-blue-400 underline underline-offset-2 decoration-slate-700 hover:decoration-blue-400 transition-colors"
          >the Smooth Operators</a>.
        </p>
        <div class="flex space-x-4">
          <NuxtLink to="/admin/login" class="text-slate-650 hover:text-white transition-colors">Portal</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
