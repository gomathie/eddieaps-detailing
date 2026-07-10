import { useDb } from '~/server/utils/db'
import { blogPosts } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing article slug.'
    })
  }

  try {
    const db = useDb(event)
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)
    if (result && result.length > 0) {
      return result[0]
    }
  } catch (error) {
    console.warn(`Failed to fetch article "${slug}" from D1 database. Serving local fallback.`, error)
  }

  // Pre-configured rich articles catalog as fallback
  const staticCatalog: Record<string, any> = {
    'ceramic-coating-benefits': {
      title: 'Why Ceramic Coating Is the Ultimate Shield for Your Vehicle',
      category: 'Paint Protection',
      author: 'Eddie APS Detailing',
      date: 'June 18, 2026',
      imageUrl: '/images/ceramic-coating.webp',
      readTime: '5 min read',
      content: `
        <p class="lead text-lg text-slate-300 mb-6 leading-relaxed">Ceramic coatings represent the pinnacle of modern automotive surface care. Unlike traditional paste waxes that melt off within a few car washes, a true nano-ceramic coating bonds chemically with your vehicle's factory clear coat, providing a semi-permanent sacrificial barrier.</p>
        <h3 class="text-xl font-bold text-white mt-8 mb-4">What Is a Ceramic Coating?</h3>
        <p class="mb-6 leading-relaxed">At its core, a ceramic coating is a liquid polymer consisting of Silicon Dioxide (SiO2) or Titanium Dioxide. When applied by hand, it cures on top of the paint, creating an extremely smooth, glass-like microscopic layer that fills in clearcoat valleys.</p>
        <h3 class="text-xl font-bold text-white mt-8 mb-4">Top 4 Benefits of Ceramic Coating</h3>
        <ul class="list-disc pl-6 mb-8 space-y-3 leading-relaxed">
          <li><strong>Super Hydrophobic Self-Cleaning:</strong> Water sheets off instantly. Dust, mud, and road film have a hard time sticking to the ultra-smooth ceramic surface, making wash days 5x easier.</li>
          <li><strong>Incredible High-Refraction Gloss:</strong> The glass coating reflects light in a parallel fashion, creating a wet look and bringing out deep metallic flakes or dark color shades.</li>
          <li><strong>UV and Oxidation Blockers:</strong> Constant sunlight degrades clear coat causing fading. Ceramic blocks harmful rays, preventing yellowing and paint failure.</li>
          <li><strong>Chemical Resistance:</strong> Neutralizes acidic damage from bird droppings, bug splatter, and environmental sap before they etch into the paint.</li>
        </ul>
      `
    },
    'leather-seat-care-tips': {
      title: 'Complete Guide to Cleaning and Moisturizing Leather Car Seats',
      category: 'Interior Cleaning',
      author: 'Eddie APS Detailing',
      date: 'May 24, 2026',
      imageUrl: '/images/deep-interior.webp',
      readTime: '4 min read',
      content: `
        <p class="lead text-lg text-slate-350 mb-6 leading-relaxed">Leather seats provide comfort and premium aesthetics, but they require periodic upkeep to maintain their flexibility and color. Debris, body oils, and UV exposure dry out leather, causing cracks, creases, and discoloration.</p>
        <h3 class="text-xl font-bold text-white mt-8 mb-4">The Professional Leather Care Process</h3>
        <ol class="list-decimal pl-6 mb-8 space-y-3 leading-relaxed">
          <li><strong>Crevice Vacuuming:</strong> Dirt and grit settle in seat seams, acting like sandpaper when sat on. We blow out seams with compressed air and vacuum thoroughly.</li>
          <li><strong>pH-Neutral Cleaner Application:</strong> Strong detergents can strip leather dyes. We spray a balanced cleanser and agitate with a soft horsehair detailing brush to lift dirt from leather pores.</li>
          <li><strong>Dry Microfiber Wipe:</strong> We wipe away the dirty lather immediately to prevent the leather from re-absorbing moisture.</li>
          <li><strong>Essential Leather Conditioning:</strong> We apply a vitamin-rich, water-based conditioner that absorbs deeply into the fibers, maintaining suppleness without leaving a greasy sheen.</li>
        </ol>
      `
    }
  }

  const post = staticCatalog[slug]
  if (post) return post

  throw createError({
    statusCode: 404,
    statusMessage: 'Detailed article not found.'
  })
})
