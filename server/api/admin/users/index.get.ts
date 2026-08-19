import { asc } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    // password hashes are never sent to the client
    return await db.select({
      id: users.id,
      username: users.username,
      role: users.role,
      createdAt: users.createdAt,
    }).from(users).orderBy(asc(users.id))
  } catch (error) {
    console.error('Failed to list admin users:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to load users.' })
  }
})
