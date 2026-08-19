import { requireSession } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  const session = await requireSession(event)
  return { authenticated: true, user: { username: session.username, role: session.role } }
})
