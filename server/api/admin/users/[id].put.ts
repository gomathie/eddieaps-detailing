import { eq, ne, and } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'
import { hashPassword } from '~~/server/utils/password'
import { readUserInput } from '~~/server/utils/users'
import { requireRole, USER_MANAGEMENT_ROLES } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  await requireRole(event, USER_MANAGEMENT_ROLES)

  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid user identification.' })
  }

  // password is optional here: blank means "leave the current one alone"
  const { username, password, role } = readUserInput(await readBody(event), { requirePassword: false })

  try {
    const db = useDb(event)

    const [clash] = await db.select({ id: users.id })
      .from(users).where(and(eq(users.username, username), ne(users.id, id))).limit(1)
    if (clash) {
      throw createError({ statusCode: 409, statusMessage: 'That username is already taken.' })
    }

    await db.update(users)
      .set({ username, role, ...(password ? { password: await hashPassword(password) } : {}) })
      .where(eq(users.id, id))

    return { success: true, message: 'User updated.' }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error(`Failed to update user ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to update the user.' })
  }
})
