import { useDb } from '~/server/utils/db'
import { quotes } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const idStr = getRouterParam(event, 'id')
  const id = Number(idStr)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid quote ID.'
    })
  }

  const body = await readBody(event)
  if (!body.status) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing status parameter.'
    })
  }

  try {
    const db = useDb(event)
    await db.update(quotes)
      .set({ status: body.status })
      .where(eq(quotes.id, id))
      
    return { success: true, message: 'Quote status updated.' }
  } catch (error: any) {
    console.error(`Failed to update status for quote ID ${id}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to execute status update.'
    })
  }
})
