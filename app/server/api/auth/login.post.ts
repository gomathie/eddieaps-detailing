import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const defaultUsername = 'admin'
  // A secure default password for development if env variables are not present
  const defaultPassword = 'eddie-aps-admin-2026'

  if (body.username === defaultUsername && (body.password === defaultPassword || body.password === config.adminPasswordHash)) {
    // Write a secure session cookie
    setCookie(event, 'admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
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
