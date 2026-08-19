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

  const password = String(body?.password ?? '')
  if (!password && !requirePassword) {
    return { username, role: role as UserRole }
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    })
  }

  return { username, password, role: role as UserRole }
}
