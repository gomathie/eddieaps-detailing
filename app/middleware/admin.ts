// Client-side guard for the admin area. Redirects to the login page when the
// visitor has no valid admin session. The /admin routes are ssr:false, so this
// runs in the browser where the session cookie is available.
export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  try {
    await $fetch('/api/auth/me')
  } catch {
    return navigateTo('/admin/login')
  }
})
