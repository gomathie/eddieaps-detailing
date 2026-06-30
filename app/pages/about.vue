<script setup lang="ts">
useSeoMeta({
  title: 'About Us',
  description: 'Learn about Eddie APS Detailing - our mission, vision, and commitment to exceptional auto detailing services.',
})

const values = [
  { icon: 'i-heroicons-heart', title: 'Passion', description: 'We love what we do and it shows in every detail.' },
  { icon: 'i-heroicons-shield-check', title: 'Integrity', description: 'Honest pricing and transparent service, always.' },
  { icon: 'i-heroicons-light-bulb', title: 'Innovation', description: 'Using the latest techniques and eco-friendly products.' },
  { icon: 'i-heroicons-user-group', title: 'Customer First', description: 'Your satisfaction is our top priority.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="gradient-hero pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="container-narrow text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">About Eddie APS Detailing</h1>
        <p class="text-xl text-white/80 max-w-3xl mx-auto">Making every client fall in love with their vehicle again through exceptional detailing services.</p>
      </div>
    </section>

    <!-- Mission -->
    <section class="section-padding">
      <div class="container-narrow max-w-4xl">
        <div class="bg-gradient-to-br from-brand-50 to-white rounded-3xl p-8 md:p-16 border border-brand-100">
          <div class="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold mb-6">Our Vision</div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-navy">Becoming the Most Trusted Detailing Provider</h2>
          <p class="text-lg text-gray-700 leading-relaxed">
            To become the most trusted and convenient provider of mobile and stationed car detailing services by delivering exceptional results and a seamless customer experience that makes every client fall in love with their vehicle again.
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-padding bg-gray-50">
      <div class="container-narrow">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-navy">Our Core Values</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="value in values" :key="value.title" class="bg-white rounded-2xl p-8 shadow-sm card-hover">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-6">
              <UIcon :name="value.icon" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-navy">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>