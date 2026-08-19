import { asc } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { socialLinks } from '~~/server/database/schema'

/** Admin list: every link, enabled or not, in display order. */
export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    return await db.select()
      .from(socialLinks)
      .orderBy(asc(socialLinks.sortOrder), asc(socialLinks.id))
  } catch (error) {
    console.error('Failed to list social links:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to load social links.' })
  }
})
