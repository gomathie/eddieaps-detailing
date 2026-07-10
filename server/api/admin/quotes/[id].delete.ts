import { useDb } from '~~/server/utils/db'
import { quotes } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid quote identification.' })
  }

  try {
    const db = useDb(event)
    await db.delete(quotes).where(eq(quotes.id, id))
    return { success: true, message: 'Quote deleted.' }
  } catch (error: any) {
    console.error(`Failed to delete quote ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete quote.' })
  }
})
