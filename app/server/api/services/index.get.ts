import { useDb } from '~/server/utils/db'
import { services } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    const result = await db.select().from(services)
    if (result && result.length > 0) {
      return result
    }
  } catch (error) {
    console.warn('D1 Query failed or not bound yet. Serving static fallback services.', error)
  }

  // Structured static fallback detailing packages
  return [
    {
      id: 1,
      slug: 'complete-detailing',
      name: 'Complete Detailing',
      description: 'The ultimate restoration package. Full deep clean of both interior and exterior including wax, polishing, and sanitization.',
      basePrice: 250,
      duration: '4-6 hours',
      imageUrl: '/images/complete-detailing.jpg',
      highlights: ['Deep carpet extraction', 'Clay bar decontamination', '12-month paint sealant', 'Engine bay light wipe']
    },
    {
      id: 2,
      slug: 'deep-interior',
      name: 'Deep Interior Detailing',
      description: 'Thorough steam cleaning, shampooing, leather conditioning, and stain removal for a factory-fresh cabin experience.',
      basePrice: 150,
      duration: '3-4 hours',
      imageUrl: '/images/deep-interior.jpg',
      highlights: ['Hot water extraction', 'Steam disinfection', 'Leather cleaning & protection', 'Dashboard & console scrub']
    },
    {
      id: 3,
      slug: 'exterior-detailing',
      name: 'Exterior Detailing',
      description: 'Premium hand wash, clay bar treatment, iron decontamination, and high-gloss paint sealing or wax application.',
      basePrice: 120,
      duration: '2-3 hours',
      imageUrl: '/images/exterior-detailing.jpg',
      highlights: ['Foam cannon pre-soak', 'Wheel barrel & caliper clean', 'Clay bar treatment', 'Hydrophobic paint sealer']
    },
    {
      id: 4,
      slug: 'paint-polishing',
      name: 'Paint Polishing',
      description: 'Remove swirl marks, minor scratches, and oxidation to restore deep color, clarity, and mirror-like reflections.',
      basePrice: 300,
      duration: '5-8 hours',
      imageUrl: '/images/paint-polishing.jpg',
      highlights: ['Dual-action machine polish', 'Swirl & halo mark removal', 'High-refraction gloss enhancement', 'Wax/sealant base coat']
    }
  ]
})
