/**
 * Input validation for the public form endpoints.
 *
 * The rule here is: store what the customer actually typed, but constrain its
 * type and size, and escape it at every point where it is interpolated into
 * markup. Sanitising on the way *in* would corrupt legitimate names like
 * "O'Brien" or "Mensah & Sons"; escaping on the way *out* is what prevents
 * injection.
 */

/** Escapes text for safe interpolation into an HTML document or email body. */
export const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const bad = (statusMessage: string) => createError({ statusCode: 400, statusMessage })

// tab, newline and carriage return are legitimate in a textarea; every other
// control character is not
const ALLOWED_CONTROL_CODES = new Set([9, 10, 13])

const stripControlChars = (value: string) =>
  Array.from(value)
    .filter((char) => {
      const code = char.codePointAt(0) ?? 0
      if (ALLOWED_CONTROL_CODES.has(code)) return true
      return code > 31 && code !== 127
    })
    .join('')

interface StringOptions {
  label: string
  required?: boolean
  max?: number
  min?: number
}

/**
 * Reads a plain text field. Rejects non-strings outright — `readBody` will
 * happily hand back objects or arrays, and passing one to D1 throws deep in the
 * driver rather than returning a clean 400.
 */
export const readString = (value: unknown, { label, required = true, max = 500, min = 1 }: StringOptions) => {
  if (value === undefined || value === null || value === '') {
    if (required) throw bad(`${label} is required.`)
    return ''
  }

  if (typeof value !== 'string' && typeof value !== 'number') {
    throw bad(`${label} must be text.`)
  }

  const clean = stripControlChars(String(value)).trim()

  if (required && clean.length < min) throw bad(`${label} is required.`)
  if (clean.length > max) throw bad(`${label} must be ${max} characters or fewer.`)

  return clean
}

/** Reads an email address, checking it is plausibly formed. */
export const readEmail = (value: unknown, label = 'Email') => {
  const email = readString(value, { label, max: 254 })
  // deliberately permissive: reject the obviously broken, not the unusual
  if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email)) {
    throw bad(`${label} must be a valid email address.`)
  }
  return email
}

/** Reads a phone number, keeping the customer's formatting but bounding it. */
export const readPhone = (value: unknown, label = 'Phone number') => {
  const phone = readString(value, { label, max: 32 })
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) {
    throw bad(`${label} must be a valid phone number.`)
  }
  return phone
}

/** Reads a vehicle year, bounded to values a real car could have. */
export const readYear = (value: unknown, label = 'Vehicle year') => {
  const year = Number(value)
  const latest = new Date().getFullYear() + 2
  if (!Number.isInteger(year) || year < 1900 || year > latest) {
    throw bad(`${label} must be between 1900 and ${latest}.`)
  }
  return year
}

/** Reads a value that must be one of a fixed set. */
export const readEnum = <T extends string>(value: unknown, allowed: readonly T[], label: string): T => {
  const found = allowed.find(option => option === value)
  if (!found) throw bad(`${label} must be one of: ${allowed.join(', ')}.`)
  return found
}

const MAX_IMAGES = 10

/**
 * Reads the uploaded image list. These are rendered as links/images later, so
 * only http(s) and same-origin relative paths are allowed — a `javascript:` or
 * `data:` entry stored here would execute wherever it is displayed.
 */
export const readImageUrls = (value: unknown, label = 'Images') => {
  if (value === undefined || value === null || value === '') return []
  if (!Array.isArray(value)) throw bad(`${label} must be a list.`)
  if (value.length > MAX_IMAGES) throw bad(`${label} may include at most ${MAX_IMAGES} files.`)

  return value.map((entry) => {
    const url = readString(entry, { label: 'Image URL', max: 2048 })

    if (url.startsWith('/')) return url // same-origin relative path

    // blob:/data: object URLs come from the browser preview and are useless
    // server-side, so treat anything that is not http(s) as invalid
    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      throw bad(`${label} contains an invalid URL.`)
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw bad(`${label} may only contain http or https links.`)
    }
    return parsed.toString()
  })
}
