import { readString, readEmail, readPhone } from '~~/server/utils/validate'

/**
 * Roles assignable to database accounts. `superadmin` is deliberately absent:
 * it belongs solely to the bootstrap account in the environment secrets, so it
 * cannot be granted — or escalated to — through the portal.
 */
export const USER_ROLES = ['administrator', 'staff'] as const

export type UserRole = typeof USER_ROLES[number]

const MIN_PASSWORD_LENGTH = 10

interface UserInput {
  username: string
  /** Undefined on edit means "keep the existing password". */
  password?: string
  role: UserRole
  fullName: string
  email: string
  phone: string
}

/** Validates and normalises a user payload from the admin portal. */
export const readUserInput = (body: any, { requirePassword }: { requirePassword: boolean }): UserInput => {
  const username = String(body?.username ?? '').trim().toLowerCase()
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username must be 3-32 characters, using letters, numbers, dot, underscore or hyphen.',
    })
  }

  const role = String(body?.role ?? 'staff').trim().toLowerCase()
  if (!USER_ROLES.includes(role as UserRole)) {
    throw createError({ statusCode: 400, statusMessage: `Role must be one of: ${USER_ROLES.join(', ')}.` })
  }

  // profile details are optional, but validated when supplied
  const fullName = readString(body?.fullName, { label: 'Full name', required: false, max: 120 })
  const email = body?.email ? readEmail(body.email) : ''
  const phone = body?.phone ? readPhone(body.phone) : ''

  const profile = { username, role: role as UserRole, fullName, email, phone }

  const password = String(body?.password ?? '')
  if (!password && !requirePassword) {
    return profile
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    })
  }

  return { ...profile, password }
}
