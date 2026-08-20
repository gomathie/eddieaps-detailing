<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isMissing = computed(() => props.error?.statusCode === 404)

const heading = computed(() =>
  isMissing.value ? "We couldn't find that page" : 'Something went wrong',
)

// The default Nuxt error page echoes the requested path back to the visitor.
// That is noise at best, and reflects attacker-controlled text at worst, so we
// show a fixed message instead.
const message = computed(() =>
  isMissing.value
    ? 'The page you\'re after may have moved or no longer exists. Let\'s get you back to a clean start.'
    : 'We hit an unexpected problem on our end. Please try again, or reach us directly and we\'ll sort it out.',
)

useSeoMeta({
  title: isMissing.value ? 'Page Not Found' : 'Something Went Wrong',
  robots: 'noindex',
})

const config = useRuntimeConfig()
const phonePrimary = config.public.phonePrimary
const phoneSecondary = config.public.phoneSecondary
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 px-5 py-16 font-sans">
    <div class="max-w-xl w-full text-center">
      <NuxtLink to="/" class="inline-block mb-10">
        <img src="/logo-wordmark-dark.svg" alt="Eddie APS Detailing" class="h-11 w-auto max-w-full mx-auto" >
      </NuxtLink>

      <p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-500 mb-3">
        Error {{ error?.statusCode || 500 }}
      </p>

      <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
        {{ heading }}
      </h1>

      <p class="text-sm sm:text-base leading-relaxed mb-8">
        {{ message }}
      </p>

      <div class="flex flex-wrap gap-3 justify-center">
        <NuxtLink
          to="/"
          class="px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
        >
          Back to Home
        </NuxtLink>
        <NuxtLink
          to="/services"
          class="px-6 py-3 text-sm font-bold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
        >
          View Our Services
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="px-6 py-3 text-sm font-bold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
        >
          Contact Us
        </NuxtLink>
      </div>

      <p class="mt-10 text-xs text-slate-500">
        Need us now? Call
        <a :href="`tel:${phonePrimary}`" class="text-slate-400 hover:text-white transition-colors">{{ phonePrimary }}</a>
        or
        <a :href="`tel:${phoneSecondary}`" class="text-slate-400 hover:text-white transition-colors">{{ phoneSecondary }}</a>
      </p>
    </div>
  </div>
</template>
