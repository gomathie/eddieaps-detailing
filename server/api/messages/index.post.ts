import { useDb } from '~~/server/utils/db'
import { messages } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.email || !body.phone || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'All fields (Name, Email, Phone, Message) are required.'
    })
  }

  try {
    const db = useDb(event)
    await db.insert(messages).values({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      status: 'unread',
      createdAt: new Date()
    })
    return { success: true, message: 'Your message has been sent successfully.' }
  } catch (error: any) {
    console.error('Failed to store contact message in D1 database:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit contact message. Please contact us directly at 0595118973.'
    })
  }
})
