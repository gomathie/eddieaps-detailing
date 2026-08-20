import { asc, eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { faqs } from '~~/server/database/schema'

/** Public list used by the home page: published FAQs only, in display order. */
export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    return await db.select({
      id: faqs.id,
      question: faqs.question,
      answer: faqs.answer,
    })
      .from(faqs)
      .where(eq(faqs.published, true))
      .orderBy(asc(faqs.sortOrder), asc(faqs.id))
  } catch (error) {
    console.warn('Failed to read FAQs from D1. The page will use its static fallback.', error)
    return []
  }
})
