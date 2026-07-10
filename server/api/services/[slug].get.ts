import { useDb } from '~/server/utils/db'
import { services } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing service slug.'
    })
  }

  try {
    const db = useDb(event)
    const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1)
    if (result && result.length > 0) {
      const s = result[0]
      return {
        ...s,
        benefits: JSON.parse(s.benefits || '[]'),
        process: JSON.parse(s.process || '[]'),
        faqs: JSON.parse(s.faqs || '[]')
      }
    }
  } catch (error) {
    console.warn(`Failed to fetch service "${slug}" from D1 database. Serving local static fallback.`, error)
  }

  const staticCatalog: Record<string, any> = {
    'complete-detailing': {
      name: 'Complete Detailing',
      description: 'The ultimate restoration package. Full deep clean of both interior and exterior including wax, polishing, and sanitization.',
      basePrice: 250,
      duration: '4-6 hours',
      imageUrl: '/images/complete-detailing.webp',
      benefits: [
        'Increases vehicle resale value significantly',
        'Removes 99.9% of interior bacteria, germs, and odors',
        'Provides a 12-month weather-resistant protective paint layer',
        'Restores dashboard and plastic trim back to factory matte shine'
      ],
      process: [
        'Step 1: Multi-stage exterior hand foam pre-wash and wash',
        'Step 2: Clay bar treatment and iron decontamination to pull out embedded particles',
        'Step 3: High-gloss machine paint polish to remove light swirls and restore reflection',
        'Step 4: Hot water extraction shampooing of all carpets, seats, and floor mats',
        'Step 5: Steam cleaning of dashboard, door cards, AC vents, and leather conditioning',
        'Step 6: Hand application of synthetic paint sealant and final inspection'
      ],
      faqs: [
        { q: "Is complete detailing suitable for all cars?", a: "Yes, we adjust our compounds, brush bristles, and steam heat depending on whether you drive a luxury sedan, classic car, or a rugged pickup truck." },
        { q: "Does this remove scratches?", a: "It removes light swirl marks and enhances paint reflection. For deep scratches, we recommend our Paint Polishing/Correction service." }
      ]
    },
    'deep-interior': {
      name: 'Deep Interior Detailing',
      description: 'Thorough steam cleaning, shampooing, leather conditioning, and stain removal for a factory-fresh cabin experience.',
      basePrice: 150,
      duration: '3-4 hours',
      imageUrl: '/images/deep-interior.webp',
      benefits: [
        'Eliminates deeply embedded pet hair, coffee stains, and mud',
        'Disinfects high-touch areas (steering, dials, seatbelts)',
        'Hydrates and protects leather seats against cracking',
        'Leaves a clean, neutral scent without artificial chemicals'
      ],
      process: [
        'Step 1: Deep dry vacuum and air-purge of crevices to dislodge debris',
        'Step 2: Dry brushing and scrubbing of carpets, roof lining, and seats',
        'Step 3: Steam sanitization of all surfaces, including vents and cup holders',
        'Step 4: Hot water carpet extraction to lift embedded stains',
        'Step 5: Leather cleaning with premium pH-neutral cleanser, followed by moisturizer',
        'Step 6: Odor neutralizer treatment and streak-free window cleaning'
      ],
      faqs: [
        { q: "Will my seats be wet after cleaning?", a: "We use high-power extraction machinery that pulls out 95% of the water. Your seats will be fully dry within 2 to 4 hours." },
        { q: "Can you guarantee all stains will be removed?", a: "While we lift almost all organic dirt, grease, and mud, some chemical stains or dye transfers (like ink or blood) might be permanent. We perform a spot check first." }
      ]
    },
    'exterior-detailing': {
      name: 'Exterior Detailing',
      description: 'Premium hand wash, clay bar treatment, iron decontamination, and high-gloss paint sealing or wax application.',
      basePrice: 120,
      duration: '2-3 hours',
      imageUrl: '/images/exterior-detailing.webp',
      benefits: [
        'Creates a durable hydrophobic paint shield that repels rain and dirt',
        'Saves clearcoat paint from acid rain, bird droppings, and environmental sap',
        'Cleans wheels, brake dust, and caliper grime extensively',
        'Restores tired trim back to deep dark finish'
      ],
      process: [
        'Step 1: Wheel barrels, calipers, and arches cleaned using iron-removing gel',
        'Step 2: High-density snow foam pre-wash to lift abrasive dirt particles safely',
        'Step 3: Two-bucket hand wash with scratch-free microfibers',
        'Step 4: Clay bar paint massage to pull off grit and roughness',
        'Step 5: Compressed air blow dry of mirrors, panel gaps, and trunk channels',
        'Step 6: Hand buffing of a hydrophobic ceramic spray sealant'
      ],
      faqs: [
        { q: "Do you use automatic brush washes?", a: "Never. We wash vehicles entirely by hand using the two-bucket method and scratch-free wash mitts to prevent swirl marks." }
      ]
    },
    'paint-polishing': {
      name: 'Paint Polishing & Correction',
      description: 'Remove swirl marks, minor scratches, and oxidation to restore deep color, clarity, and mirror-like reflections.',
      basePrice: 300,
      duration: '5-8 hours',
      imageUrl: '/images/paint-polishing.webp',
      benefits: [
        'Removes 80-90% of clear coat swirl marks and light spider-web scratches',
        'Restores dull, hazy, or oxidized paint back to deep, glassy gloss',
        'Creates a flat paint texture, optimizing reflection angles',
        'Prepares paint for long-term ceramic coating integration'
      ],
      process: [
        'Step 1: Multi-stage wash, iron decontamination, and clay bar scrub',
        'Step 2: Paint depth gauge reading to verify clearcoat thickness',
        'Step 3: Sensitive trims, badges, and rubbers taped off for safety',
        'Step 4: Compounding phase using a cutting pad to level scratches',
        'Step 5: Polishing phase using a finishing pad to maximize gloss and clarity',
        'Step 6: Panel wipe down to remove residues, followed by sealant application'
      ],
      faqs: [
        { q: "Will this fix deep scratches?", a: "If a scratch has gone through the clear coat into the primer (e.g. if you can catch it with a fingernail), polishing won't fully remove it. It will, however, make the edges rounder and less visible." }
      ]
    }
  }

  const service = staticCatalog[slug]
  if (service) return service

  throw createError({
    statusCode: 404,
    statusMessage: 'Requested detailing package not found.'
  })
})
