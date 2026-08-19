import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'
import { requireRole, USER_MANAGEMENT_ROLES } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid user identification.' })
  }

  const session = await requireRole(event, USER_MANAGEMENT_ROLES)

  try {
    const db = useDb(event)

    const [target] = await db.select({ username: users.username })
      .from(users).where(eq(users.id, id)).limit(1)
    if (!target) {
      throw createError({ statusCode: 404, statusMessage: 'User not found.' })
    }

    // deleting yourself would end your own session mid-flight
    if (target.username === session.username) {
      throw createError({ statusCode: 400, statusMessage: 'You cannot delete the account you are signed in with.' })
    }

    // never leave the portal with no database account to sign in as
    const remaining = await db.select({ id: users.id }).from(users)
    if (remaining.length <= 1) {
      throw createError({ statusCode: 400, statusMessage: 'At least one admin user must remain.' })
    }

    await db.delete(users).where(eq(users.id, id))
    return { success: true, message: 'User deleted.' }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error(`Failed to delete user ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete the user.' })
  }
})
