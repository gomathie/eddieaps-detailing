import { clearSessionCookie } from '~~/server/utils/session'

export default defineEventHandler((event) => {
  clearSessionCookie(event)
  return { success: true, message: 'Logged out.' }
})
