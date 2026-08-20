import { asc } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { gallery } from '~~/server/database/schema'
import type { GalleryItem } from '#shared/types'

/**
 * Public gallery feed.
 *
 * The table stores before/after pairs, while the page renders either a
 * comparison slider or a single image, so rows are normalised into the shape
 * the page expects. The page keeps its own static list as the fallback.
 */
export default defineEventHandler(async (event): Promise<GalleryItem[]> => {
  try {
    const db = useDb(event)
    const rows = await db.select().from(gallery).orderBy(asc(gallery.id))

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      type: 'slider' as const,
      category: row.category,
      before: row.beforeImage,
      after: row.afterImage,
    }))
  } catch (error) {
    console.warn('Failed to read gallery from D1. The page will use its static fallback.', error)
    return []
  }
})
