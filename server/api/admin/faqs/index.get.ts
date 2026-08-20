import { asc } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { faqs } from '~~/server/database/schema'

/** Admin list: every FAQ, published or not, in display order. */
export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    return await db.select().from(faqs).orderBy(asc(faqs.sortOrder), asc(faqs.id))
  } catch (error) {
    console.error('Failed to list FAQs:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to load FAQs.' })
  }
})
