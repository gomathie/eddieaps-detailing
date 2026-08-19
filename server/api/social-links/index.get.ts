import { asc, eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { socialLinks } from '~~/server/database/schema'

/** Public list used by the footer: enabled links only, in display order. */
export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    return await db.select()
      .from(socialLinks)
      .where(eq(socialLinks.enabled, true))
      .orderBy(asc(socialLinks.sortOrder), asc(socialLinks.id))
  } catch (error) {
    console.warn('Failed to read social links from D1. Serving an empty list.', error)
    return []
  }
})
