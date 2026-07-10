import { setCookie } from 'h3'

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

  const adminUsername = config.adminUsername || 'admin'
  const adminPassword = config.adminPasswordHash

  // Fail closed: if no admin password is configured, no login is possible.
  if (!adminPassword) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Admin login is not configured. Set the NUXT_ADMIN_PASSWORD_HASH secret.'
    })
  }

  const okUser = safeEqual(String(body.username ?? ''), adminUsername)
  const okPass = safeEqual(String(body.password ?? ''), adminPassword)

  if (okUser && okPass) {
    setCookie(event, 'admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    })

    return { success: true, user: { username: 'admin', role: 'administrator' } }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid admin credentials.'
  })
})
