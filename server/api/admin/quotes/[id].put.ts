import { useDb } from '~~/server/utils/db'
import { quotes } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { readEnum } from '~~/server/utils/validate'

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
  // only the statuses the portal actually offers may be written
  const status = readEnum(body?.status, ['Pending', 'Sent', 'Declined'] as const, 'Quote status')

  try {
    const db = useDb(event)
    await db.update(quotes)
      .set({ status })
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
