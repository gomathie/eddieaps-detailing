<script setup lang="ts">
const { data: services } = await useFetch('/api/services')

useSeoMeta({
  title: 'Our Services',
  description: 'Explore our complete range of professional auto detailing services including interior, exterior, paint polishing, and mobile detailing.',
})
</script>

<template>
  <div>
    <section class="gradient-hero pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="container-narrow text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">Our Detailing Services</h1>
        <p class="text-xl text-white/80 max-w-3xl mx-auto">Professional solutions for every aspect of your vehicle's care.</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container-narrow">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="service in services"
            :key="service.id"
            :to="`/services/${service.slug}`"
            class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all card-hover border border-gray-100"
          >
            <div class="aspect-video bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center">
              <UIcon name="i-heroicons-sparkles" class="w-20 h-20 text-white/30" />
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold mb-3 text-navy group-hover:text-brand-700 transition-colors">{{ service.name }}</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">{{ service.shortDescription }}</p>
              <div class="flex items-center justify-between text-sm">
                <span v-if="service.duration" class="text-gray-500 flex items-center gap-1">
                  <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                  {{ service.duration }}
                </span>
                <span class="text-brand-700 font-semibold flex items-center gap-1">
                  Learn more
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>