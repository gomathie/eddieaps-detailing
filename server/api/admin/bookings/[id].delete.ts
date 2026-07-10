import { useDb } from '~~/server/utils/db'
import { bookings } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid booking identification.' })
  }

  try {
    const db = useDb(event)
    await db.delete(bookings).where(eq(bookings.id, id))
    return { success: true, message: 'Booking deleted.' }
  } catch (error: any) {
    console.error(`Failed to delete booking ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete booking.' })
  }
})
