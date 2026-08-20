<script setup lang="ts">
/**
 * LocalBusiness structured data. This is what lets Google show the business
 * name, phone, hours and rating in local results — without it an auto detailer
 * is largely invisible to "near me" searches.
 */
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const phonePrimary = config.public.phonePrimary
const phoneSecondary = config.public.phoneSecondary

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  '@id': `${siteUrl}/#business`,
  name: 'Eddie APS Detailing',
  alternateName: 'EDDIEAPS',
  description:
    'Professional mobile and stationed auto detailing in Ghana — complete detailing, interior deep cleans, exterior detailing and paint polishing.',
  url: siteUrl,
  logo: `${siteUrl}/logo-wordmark-light.svg`,
  image: `${siteUrl}/og-image.png`,
  telephone: `+233${phonePrimary.replace(/^0/, '')}`,
  slogan: 'Precision. Shine. Perfection.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GH',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Ghana',
  },
  contactPoint: [phonePrimary, phoneSecondary].map(number => ({
    '@type': 'ContactPoint',
    telephone: `+233${number.replace(/^0/, '')}`,
    contactType: 'customer service',
    areaServed: 'GH',
    availableLanguage: 'English',
  })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
  ],
  makesOffer: [
    'Complete Detailing',
    'Deep Interior Detailing',
    'Exterior Detailing',
    'Paint Polishing & Correction',
  ].map(name => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name },
  })),
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
    },
  ],
})
</script>

<template><span class="hidden" /></template>
