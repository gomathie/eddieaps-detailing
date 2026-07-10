import { useDb } from '~~/server/utils/db'
import { bookings } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const idStr = getRouterParam(event, 'id')
  const id = Number(idStr)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid booking identification.'
    })
  }

  const body = await readBody(event)
  if (!body.status) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing status payload.'
    })
  }

  try {
    const db = useDb(event)
    await db.update(bookings)
      .set({ status: body.status })
      .where(eq(bookings.id, id))
      
    return { success: true, message: 'Booking status updated.' }
  } catch (error: any) {
    console.error(`Failed to update booking status for ID ${id}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to execute status update.'
    })
  }
})
