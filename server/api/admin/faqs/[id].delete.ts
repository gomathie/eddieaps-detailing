import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { faqs } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid FAQ identification.' })
  }

  try {
    const db = useDb(event)
    await db.delete(faqs).where(eq(faqs.id, id))
    return { success: true, message: 'FAQ deleted.' }
  } catch (error: any) {
    console.error(`Failed to delete FAQ ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete the FAQ.' })
  }
})
