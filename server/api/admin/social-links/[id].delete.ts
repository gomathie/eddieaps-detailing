import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { socialLinks } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid social link identification.' })
  }

  try {
    const db = useDb(event)
    await db.delete(socialLinks).where(eq(socialLinks.id, id))
    return { success: true, message: 'Social link deleted.' }
  } catch (error: any) {
    console.error(`Failed to delete social link ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete the social link.' })
  }
})
