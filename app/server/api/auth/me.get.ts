import { getCookie } from 'h3'

export default defineEventHandler((event) => {
  const session = getCookie(event, 'admin_session')
  
  if (session === 'authenticated') {
    return { authenticated: true, user: { username: 'admin', role: 'administrator' } }
  }
  
  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized. Please sign in.'
  })
})
