<template>
  <footer class="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-900">
        <!-- Brand Info -->
        <div>
          <NuxtLink to="/" class="flex items-center gap-2.5 mb-4">
            <img src="/logo.svg" alt="Eddie APS Detailing" class="h-9 w-auto brightness-0 invert" >
          </NuxtLink>
          <p class="text-sm leading-relaxed mb-6">
            Providing high-quality mobile and stationed auto detailing services. Restoring and protecting your vehicle's beauty wherever you are.
          </p>
          <div class="flex space-x-4">
            <!-- Social Icons (Placeholders/SVG) -->
            <a href="#" class="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-400 hover:text-white flex items-center justify-center transition-all duration-200">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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
              <span>Mon - Sun: 7:00 AM - 7:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright & Local Schema -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
        <p>© 2026 Eddie APS Detailing. All rights reserved.</p>
        <p>Built with Vue 3 & Nuxt 3. Deployed on Cloudflare.</p>
        <div class="flex space-x-4">
          <NuxtLink to="/admin/login" class="text-slate-650 hover:text-white transition-colors">Admin Portal</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
