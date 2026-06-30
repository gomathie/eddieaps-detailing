<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
]

const checkScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2" @click="closeMobileMenu">
          <span class="text-xl sm:text-2xl font-extrabold tracking-wider text-white">
            EDDIE <span class="text-blue-500">APS</span> DETAILING
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
            active-class="text-blue-500 hover:text-blue-400"
          >
            {{ link.name }}
          </NuxtLink>
          <a
            href="/#contact"
            class="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
        </nav>

        <!-- Desktop Call To Actions -->
        <div class="hidden lg:flex items-center space-x-4">
          <a
            href="tel:0595118973"
            class="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            0595118973
          </a>
          <NuxtLink
            to="/quote"
            class="px-4 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors"
          >
            Get Free Quote
          </NuxtLink>
          <NuxtLink
            to="/book"
            class="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md hover:shadow-blue-500/20 transition-all duration-200"
          >
            Book Appointment
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden space-x-3">
          <NuxtLink
            to="/book"
            class="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md"
          >
            Book
          </NuxtLink>
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg class="h-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Overlay -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden bg-slate-900 border-b border-slate-800 shadow-xl">
        <div class="px-2 pt-2 pb-6 space-y-1 sm:px-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            active-class="text-blue-500 bg-slate-800/40"
            @click="closeMobileMenu"
          >
            {{ link.name }}
          </NuxtLink>
          <a
            href="/#contact"
            class="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            @click="closeMobileMenu"
          >
            Contact
          </a>
          <div class="pt-4 px-3 flex flex-col space-y-3">
            <a
              href="tel:0595118973"
              class="flex items-center justify-center gap-2 text-slate-300 py-2.5 font-medium border border-slate-800 rounded-lg hover:text-white"
            >
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 0595118973
            </a>
            <NuxtLink
              to="/quote"
              class="block text-center py-2.5 text-slate-300 font-medium border border-slate-800 rounded-lg hover:text-white"
              @click="closeMobileMenu"
            >
              Get Free Quote
            </NuxtLink>
            <NuxtLink
              to="/book"
              class="block text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md"
              @click="closeMobileMenu"
            >
              Book Appointment
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
