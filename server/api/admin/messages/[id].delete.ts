import { useDb } from '~~/server/utils/db'
import { messages } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid message identification.' })
  }

  try {
    const db = useDb(event)
    await db.delete(messages).where(eq(messages.id, id))
    return { success: true, message: 'Message deleted.' }
  } catch (error: any) {
    console.error(`Failed to delete message ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete message.' })
  }
})
