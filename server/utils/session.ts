import type { H3Event } from 'h3'
import { getCookie, setCookie, deleteCookie } from 'h3'

/**
 * Admin session cookie.
 *
 * The cookie carries the signed payload `<base64url(json)>.<base64url(hmac)>`.
 * Without the signature any visitor could set the cookie by hand and be treated
 * as an administrator, so every admin request verifies the HMAC before trusting
 * the identity inside it.
 */

export const SESSION_COOKIE = 'admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 // 1 day

export interface AdminSession {
  username: string
  role: string
  /** Unix seconds. */
  exp: number
}

const encoder = new TextEncoder()

const b64urlEncode = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const b64urlDecode = (value: string) => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  return Uint8Array.from(atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, '=')), c => c.charCodeAt(0))
}

const getSecret = () => {
  const secret = useRuntimeConfig().jwtSecret
  if (!secret) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Admin sessions are not configured. Set the NUXT_JWT_SECRET secret.',
    })
  }
  return secret
}

const sign = async (payload: string) => {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  return b64urlEncode(new Uint8Array(signature))
}

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

export const createSessionToken = async (session: Omit<AdminSession, 'exp'>) => {
  const payload: AdminSession = {
    ...session,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const body = b64urlEncode(encoder.encode(JSON.stringify(payload)))
  return `${body}.${await sign(body)}`
}

export const readSessionToken = async (token: string | undefined): Promise<AdminSession | null> => {
  if (!token) return null

  const [body, signature] = token.split('.')
  if (!body || !signature) return null
  if (!timingSafeEqual(signature, await sign(body))) return null

  try {
    const session = JSON.parse(new TextDecoder().decode(b64urlDecode(body))) as AdminSession
    if (!session.username || typeof session.exp !== 'number') return null
    if (session.exp * 1000 < Date.now()) return null
    return session
  } catch {
    return null
  }
}

export const setSessionCookie = async (event: H3Event, session: Omit<AdminSession, 'exp'>) => {
  setCookie(event, SESSION_COOKIE, await createSessionToken(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  })
}

export const clearSessionCookie = (event: H3Event) =>
  deleteCookie(event, SESSION_COOKIE, { path: '/' })

/**
 * Returns the verified session, or null when the cookie is absent/forged/expired.
 * Named `getAdminSession` rather than `getSession` so it does not shadow h3's
 * auto-imported helper of that name.
 */
export const getAdminSession = (event: H3Event) =>
  readSessionToken(getCookie(event, SESSION_COOKIE))

/** Throws 401 unless the request carries a valid admin session. */
export const requireSession = async (event: H3Event) => {
  const session = await getAdminSession(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized. Administrative session is missing or expired.',
    })
  }
  return session
}

/**
 * The bootstrap account from environment secrets. It is the only superadmin and
 * cannot be created through the portal, so there is always exactly one.
 */
export const SUPERADMIN_ROLE = 'superadmin'

/** Roles allowed to create, edit and delete portal accounts. */
export const USER_MANAGEMENT_ROLES = [SUPERADMIN_ROLE, 'administrator']

/** Throws 403 when the signed-in account's role is not in `roles`. */
export const requireRole = async (event: H3Event, roles: string[]) => {
  const session = await requireSession(event)
  if (!roles.includes(session.role)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Your account does not have permission to do that.',
    })
  }
  return session
}
