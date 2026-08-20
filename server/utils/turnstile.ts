import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

interface SiteverifyResponse {
  success: boolean
  'error-codes'?: string[]
  hostname?: string
}

/**
 * Verifies a Turnstile token server-side.
 *
 * siteverify must never be called from the browser — the secret would be
 * exposed and the result trivially forged. This runs in the Nitro route, which
 * already has the secret via runtimeConfig.
 *
 * When TURNSTILE_SECRET_KEY is not configured the check is skipped, matching
 * how notifications degrade: an unconfigured integration must not take the
 * public forms down. Once the secret is set, a missing or invalid token is
 * rejected.
 */
export const assertHumanVerified = async (event: H3Event, token: unknown) => {
  const secret = useRuntimeConfig(event).turnstileSecretKey

  if (!secret) {
    console.warn('Turnstile is not configured (NUXT_TURNSTILE_SECRET_KEY unset) — skipping bot check.')
    return
  }

  const response = String(token ?? '').trim()
  if (!response) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please complete the "I\'m not a robot" check and try again.',
    })
  }

  const body = new URLSearchParams({ secret, response })

  // binding the token to the client IP blocks token replay from elsewhere
  const ip = getRequestHeader(event, 'cf-connecting-ip')
  if (ip) body.set('remoteip', ip)

  let result: SiteverifyResponse
  try {
    result = await $fetch<SiteverifyResponse>(SITEVERIFY_URL, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  } catch (error) {
    // Cloudflare being unreachable should not silently disable the check
    console.error('Turnstile siteverify request failed:', error)
    throw createError({
      statusCode: 503,
      statusMessage: 'We could not verify your submission right now. Please try again in a moment.',
    })
  }

  if (!result.success) {
    console.warn('Turnstile rejected a submission:', result['error-codes']?.join(', ') || 'unknown')
    throw createError({
      statusCode: 400,
      statusMessage: 'Verification failed. Please refresh the page and try again.',
    })
  }
}
