import { useDb } from '~~/server/utils/db'
import { messages } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { readEnum } from '~~/server/utils/validate'

export default defineEventHandler(async (event) => {
  const idStr = getRouterParam(event, 'id')
  const id = Number(idStr)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid message ID.'
    })
  }

  const body = await readBody(event)
  // only the statuses the portal actually offers may be written
  const status = readEnum(body?.status, ['unread', 'read', 'archived'] as const, 'Message status')

  try {
    const db = useDb(event)
    await db.update(messages)
      .set({ status })
      .where(eq(messages.id, id))
      
    return { success: true, message: 'Message status updated.' }
  } catch (error: any) {
    console.error(`Failed to update status for message ID ${id}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to execute status update.'
    })
  }
})
