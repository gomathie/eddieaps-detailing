/**
 * Password hashing for admin users.
 *
 * Cloudflare Workers have no native bcrypt/argon2, but WebCrypto is available,
 * so we use PBKDF2-SHA256 with a per-password random salt. Stored format:
 *   pbkdf2$<iterations>$<salt-b64>$<hash-b64>
 */

const ITERATIONS = 100_000
const KEY_LENGTH = 32 // bytes
const PREFIX = 'pbkdf2'

const toBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes))

const fromBase64 = (value: string) =>
  Uint8Array.from(atob(value), char => char.charCodeAt(0))

// Uint8Array<ArrayBuffer>, not the default Uint8Array<ArrayBufferLike>: WebCrypto
// takes a BufferSource, which excludes SharedArrayBuffer-backed views.
const derive = async (password: string, salt: Uint8Array<ArrayBuffer>, iterations: number) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    key,
    KEY_LENGTH * 8,
  )
  return new Uint8Array(bits)
}

export const hashPassword = async (password: string) => {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await derive(password, salt, ITERATIONS)
  return `${PREFIX}$${ITERATIONS}$${toBase64(salt)}$${toBase64(hash)}`
}

/** Constant-time comparison so a wrong password can't be timed out byte by byte. */
const timingSafeEqual = (a: Uint8Array, b: Uint8Array) => {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a[i]! ^ b[i]!
  return mismatch === 0
}

export const verifyPassword = async (password: string, stored: string) => {
  const [prefix, iterations, salt, hash] = stored.split('$')
  if (prefix !== PREFIX || !iterations || !salt || !hash) return false

  const candidate = await derive(password, fromBase64(salt), Number(iterations))
  return timingSafeEqual(candidate, fromBase64(hash))
}

/** True when a stored value is in the hashed format rather than legacy plaintext. */
export const isHashed = (stored: string) => stored.startsWith(`${PREFIX}$`)

/** Constant-time comparison for the legacy plaintext case. */
const safeEqualString = (a: string, b: string) => {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

/**
 * Verifies the bootstrap superadmin password from the environment.
 *
 * The secret is named ADMIN_PASSWORD_HASH, so it accepts a real hash — bcrypt
 * (`$2a$`/`$2b$`/`$2y$`) or our own PBKDF2 format. A value that is neither is
 * treated as plaintext, which keeps older deployments working, but it means the
 * password sits in the environment in the clear: prefer a hash.
 */
export const verifyEnvPassword = async (password: string, stored: string) => {
  if (isHashed(stored)) return verifyPassword(password, stored)

  if (/^\$2[aby]\$/.test(stored)) {
    // bcryptjs is pure JS, so this works on Workers where native bcrypt does not
    const bcrypt = await import('bcryptjs')
    return bcrypt.compare(password, stored)
  }

  return safeEqualString(password, stored)
}

/** True when the configured secret is a hash rather than a plaintext password. */
export const isEnvPasswordHashed = (stored: string) =>
  isHashed(stored) || /^\$2[aby]\$/.test(stored)
