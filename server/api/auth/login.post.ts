import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'
import { verifyPassword, isHashed } from '~~/server/utils/password'
import { setSessionCookie } from '~~/server/utils/session'

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

  // 2. The bootstrap account from environment secrets, so the portal is still
  //    reachable before any user rows exist.
  const envUsername = config.adminUsername || 'admin'
  const envPassword = config.adminPasswordHash

  if (!envPassword) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Admin login is not configured. Set the NUXT_ADMIN_PASSWORD_HASH secret.',
    })
  }

  if (safeEqual(username, envUsername) && safeEqual(password, envPassword)) {
    await setSessionCookie(event, { username: envUsername, role: 'administrator' })
    return { success: true, user: { username: envUsername, role: 'administrator' } }
  }

  throw createError({ statusCode: 401, statusMessage: 'Invalid admin credentials.' })
})
