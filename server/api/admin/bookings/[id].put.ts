import { useDb } from '~~/server/utils/db'
import { bookings } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { readEnum } from '~~/server/utils/validate'

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
  // only the statuses the portal actually offers may be written
  const status = readEnum(body?.status, ['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const, 'Booking status')

  try {
    const db = useDb(event)
    await db.update(bookings)
      .set({ status })
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
