import { requireSession } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  const url = event.node.req.url || ''

  // Every /api/admin/ route requires a signed, unexpired admin session.
  if (url.startsWith('/api/admin')) {
    await requireSession(event)
  }
})
