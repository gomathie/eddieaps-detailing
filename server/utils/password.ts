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

const derive = async (password: string, salt: Uint8Array, iterations: number) => {
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
