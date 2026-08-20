import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'
import { hashPassword } from '~~/server/utils/password'
import { readUserInput } from '~~/server/utils/users'
import { requireRole, USER_MANAGEMENT_ROLES } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  await requireRole(event, USER_MANAGEMENT_ROLES)

  const { username, password, role, fullName, email, phone } = readUserInput(await readBody(event), { requirePassword: true })

  try {
    const db = useDb(event)

    const [existing] = await db.select({ id: users.id })
      .from(users).where(eq(users.username, username)).limit(1)
    if (existing) {
      throw createError({ statusCode: 409, statusMessage: 'That username is already taken.' })
    }

    const [created] = await db.insert(users)
      .values({ username, password: await hashPassword(password!), role, fullName, email, phone })
      .returning({
        id: users.id,
        username: users.username,
        role: users.role,
        fullName: users.fullName,
        email: users.email,
        phone: users.phone,
        createdAt: users.createdAt,
      })

    return { success: true, message: 'User created.', user: created }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Failed to create admin user:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to create the user.' })
  }
})
