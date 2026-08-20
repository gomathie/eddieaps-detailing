import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'

/**
 * Country blocking for the public form endpoints.
 *
 * These are ISO 3166-1 alpha-2 codes. The business serves vehicles physically
 * in Ghana, so submissions from these origins are spam rather than lost custom.
 * Only form POSTs are blocked — browsing the site stays open to everyone, which
 * keeps search crawlers and genuine readers unaffected.
 */
export const BLOCKED_COUNTRIES = new Set([
  'IN', // India
  'PK', // Pakistan
  'BD', // Bangladesh
])

/** Cloudflare resolves the client country at the edge and passes it through. */
export const getRequestCountry = (event: H3Event): string | null => {
  // set by Cloudflare on every proxied request
  const header = getRequestHeader(event, 'cf-ipcountry')
  if (header) return header.toUpperCase()

  // fallback for the workerd runtime, where it also rides on request.cf
  const cf = (event.context as any)?.cloudflare?.request?.cf
  return cf?.country ? String(cf.country).toUpperCase() : null
}

/**
 * Rejects form submissions from blocked countries. Returns the country so the
 * caller can log it; throws 403 when the origin is blocked.
 */
export const assertCountryAllowed = (event: H3Event) => {
  const country = getRequestCountry(event)

  if (country && BLOCKED_COUNTRIES.has(country)) {
    console.warn(`Blocked form submission from ${country}`)
    throw createError({
      statusCode: 403,
      statusMessage: 'Sorry, we are unable to accept submissions from your at this moment try again next month.',
    })
  }

  return country
}
