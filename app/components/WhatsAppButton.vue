<script setup lang="ts">
import { ref } from 'vue'

const isHovered = ref(false)
const whatsappNumber = '0595118973'
const defaultMessage = encodeURIComponent("Hello Eddie APS Detailing! I'm interested in booking a car detailing service.")
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`
</script>

<template>
  <div
    class="fixed bottom-6 right-6 z-40 flex items-center space-x-2"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Tooltip label -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-x-4 scale-95"
      enter-to-class="opacity-100 translate-x-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-x-0 scale-100"
      leave-to-class="opacity-0 translate-x-4 scale-95"
    >
      <div
        v-if="isHovered"
        class="bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-lg border border-slate-800"
      >
        Chat on WhatsApp
      </div>
    </transition>

    <!-- Floating Button -->
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
      aria-label="Chat on WhatsApp"
    >
      <!-- Pulsing border effect -->
      <span class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25"></span>

      <!-- WhatsApp SVG -->
      <svg class="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.288 1.482 4.605 1.485 5.485.002 9.948-4.453 9.951-9.932.002-2.654-1.031-5.147-2.909-7.025-1.879-1.879-4.381-2.914-7.042-2.915-5.488 0-9.95 4.453-9.954 9.934-.002 2.152.569 4.258 1.654 6.13L1.93 21.055l4.717-1.901zm11.536-5.321c-.301-.151-1.782-.879-2.057-.979-.275-.1-.475-.151-.675.15-.2.3-.775.979-.95 1.178-.175.2-.35.226-.65.075-1.025-.513-1.722-.923-2.417-1.52-.69-.595-1.121-1.39-1.258-1.625-.138-.235-.015-.361.11-.486.111-.112.25-.291.375-.436.125-.145.166-.25.25-.416.084-.167.042-.313-.021-.463-.063-.151-.575-1.383-.787-1.895-.207-.5-.418-.432-.575-.44-.15-.008-.323-.008-.496-.008-.173 0-.455.064-.693.32-.238.256-.909.887-.909 2.163 0 1.277.928 2.511 1.057 2.684.13.173 1.827 2.79 4.426 3.911.618.267 1.1.426 1.477.546.621.197 1.186.169 1.632.102.497-.074 1.782-.728 2.032-1.431.25-.703.25-1.306.175-1.431-.075-.125-.275-.201-.575-.351z"/>
      </svg>
    </a>
  </div>
</template>
