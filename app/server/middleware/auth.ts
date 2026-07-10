import { getCookie } from 'h3'

export default defineEventHandler((event) => {
  const url = event.node.req.url || ''
  
  // Apply authentication check to all routes starting with /api/admin/
  if (url.startsWith('/api/admin')) {
    const session = getCookie(event, 'admin_session')
    
    if (session !== 'authenticated') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized. Administrative session is missing or expired.'
      })
    }
  }
})
