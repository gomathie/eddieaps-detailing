import { useDb } from '~~/server/utils/db'
import { blogPosts } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    const result = await db.select().from(blogPosts)
    if (result && result.length > 0) {
      return result
    }
  } catch (error) {
    console.warn('Failed to query blog posts from D1. Serving static fallback blog list.', error)
  }

  // Static articles list as fallback
  return [
    {
      id: 1,
      slug: 'ceramic-coating-benefits',
      title: 'Why Ceramic Coating Is the Ultimate Shield for Your Vehicle',
      excerpt: 'Discover how nano-ceramic technology bonds with your paint to block UV rays, chemical stains, and bird droppings while providing an intense hydrophobic gloss.',
      category: 'Paint Protection',
      author: 'Eddie APS Detailing',
      date: 'June 18, 2026',
      imageUrl: '/images/ceramic-coating.webp',
      readTime: '5 min read'
    },
    {
      id: 2,
      slug: 'leather-seat-care-tips',
      title: 'Complete Guide to Cleaning and Moisturizing Leather Car Seats',
      excerpt: 'Avoid cracks and fading. Learn the step-by-step process of cleaning leather using pH-neutral cleansers, horsehair brushes, and rich nutrient conditioners.',
      category: 'Interior Cleaning',
      author: 'Eddie APS Detailing',
      date: 'May 24, 2026',
      imageUrl: '/images/deep-interior.webp',
      readTime: '4 min read'
    },
    {
      id: 3,
      slug: 'mobile-detailing-checklist',
      title: 'How to Prepare Your Car for a Mobile Detailing Appointment',
      excerpt: 'Make the detailing session faster and more effective. Here is our simple checklist of things to clear from your vehicle before our mobile team arrives.',
      category: 'Detailing Advice',
      author: 'Eddie APS Detailing',
      date: 'April 10, 2026',
      imageUrl: '/images/complete-detailing.webp',
      readTime: '3 min read'
    },
    {
      id: 4,
      slug: 'engine-bay-safety-cleaning',
      title: 'Is It Safe to Wash Your Engine Bay? Common Myths Debunked',
      excerpt: 'An clean engine runs cooler and makes maintenance simpler. We explain how professionals shield electrical components and steam clean safely.',
      category: 'Vehicle Maintenance',
      author: 'Eddie APS Detailing',
      date: 'March 05, 2026',
      imageUrl: '/images/luxury-car.webp',
      readTime: '6 min read'
    }
  ]
})
