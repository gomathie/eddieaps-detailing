import { useDb } from '~~/server/utils/db'
import { messages } from '~~/server/database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    return await db.select().from(messages).orderBy(desc(messages.createdAt))
  } catch (error) {
    console.warn('Failed to query messages from D1. Serving local fallback.', error)
    
    return [
      {
        id: 1,
        name: 'Emily Davis',
        email: 'emily@example.com',
        phone: '0591357411',
        message: 'Hello, do you offer gift cards for detailing? I would like to buy one for my husband.',
        status: 'unread',
        createdAt: new Date('256-06-30') // Mock date
      }
    ]
  }
})
