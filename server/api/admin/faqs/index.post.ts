import { useDb } from '~~/server/utils/db'
import { faqs } from '~~/server/database/schema'
import { readFaqInput } from '~~/server/utils/faqs'

export default defineEventHandler(async (event) => {
  const input = readFaqInput(await readBody(event))

  try {
    const db = useDb(event)
    const [created] = await db.insert(faqs).values(input).returning()
    return { success: true, message: 'FAQ added.', faq: created }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Failed to create FAQ:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to save the FAQ.' })
  }
})
