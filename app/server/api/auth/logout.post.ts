import { deleteCookie } from 'h3'

export default defineEventHandler((event) => {
  deleteCookie(event, 'admin_session', { path: '/' })
  return { success: true, message: 'Logged out.' }
})
