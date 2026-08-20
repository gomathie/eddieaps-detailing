import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { faqs } from '~~/server/database/schema'
import { readFaqInput } from '~~/server/utils/faqs'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid FAQ identification.' })
  }

  const input = readFaqInput(await readBody(event))

  try {
    const db = useDb(event)
    await db.update(faqs).set({ ...input, updatedAt: new Date() }).where(eq(faqs.id, id))
    return { success: true, message: 'FAQ updated.' }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error(`Failed to update FAQ ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to update the FAQ.' })
  }
})
