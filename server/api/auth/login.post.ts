import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'
import { verifyPassword, isHashed, verifyEnvPassword } from '~~/server/utils/password'
import { setSessionCookie, SUPERADMIN_ROLE } from '~~/server/utils/session'

// Constant-time string comparison to avoid leaking timing information.
const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const username = String(body?.username ?? '').trim()
  const password = String(body?.password ?? '')

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Username and password are required.' })
  }

  // 1. Users created from the admin portal, stored in D1 with a PBKDF2 hash.
  try {
    const db = useDb(event)
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1)

    if (user && isHashed(user.password) && await verifyPassword(password, user.password)) {
      await setSessionCookie(event, { username: user.username, role: user.role })
      return { success: true, user: { username: user.username, role: user.role } }
    }
  } catch (error) {
    console.warn('Could not check D1 for admin users. Falling back to the env credentials.', error)
  }

  // 2. The bootstrap superadmin from environment secrets. It exists only in the
  //    env, never in the database, and is who creates the site's admin accounts.
  const envUsername = config.adminUsername || 'admin'
  const envPassword = config.adminPassword

  if (!envPassword) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Admin login is not configured. Set the NUXT_ADMIN_PASSWORD secret.',
    })
  }

  if (safeEqual(username, envUsername) && await verifyEnvPassword(password, envPassword)) {
    await setSessionCookie(event, { username: envUsername, role: SUPERADMIN_ROLE })
    return { success: true, user: { username: envUsername, role: SUPERADMIN_ROLE } }
  }

  throw createError({ statusCode: 401, statusMessage: 'Invalid admin credentials.' })
})
