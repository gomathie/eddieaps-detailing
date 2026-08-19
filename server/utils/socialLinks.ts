/** Platforms the footer knows how to render an icon for. */
export const SOCIAL_PLATFORMS = [
  'facebook',
  'instagram',
  'tiktok',
  'x',
  'youtube',
  'linkedin',
  'whatsapp',
  'website',
] as const

export type SocialPlatform = typeof SOCIAL_PLATFORMS[number]

export interface SocialLinkInput {
  platform: SocialPlatform
  label: string
  url: string
  sortOrder: number
  enabled: boolean
}

/**
 * These URLs are rendered straight into an `href`, so only http(s) is accepted —
 * a `javascript:` or `data:` URL saved here would otherwise execute for every
 * visitor who clicks the footer icon.
 */
const assertSafeUrl = (value: unknown) => {
  const raw = String(value ?? '').trim()
  if (!raw) {
    throw createError({ statusCode: 400, statusMessage: 'A link URL is required.' })
  }

  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Enter a full URL, e.g. https://facebook.com/yourpage' })
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw createError({ statusCode: 400, statusMessage: 'Only http and https links are allowed.' })
  }
  return parsed.toString()
}

/** Validates and normalises a social link payload from the admin portal. */
export const readSocialLinkInput = (body: any): SocialLinkInput => {
  const platform = String(body?.platform ?? '').trim().toLowerCase()
  if (!SOCIAL_PLATFORMS.includes(platform as SocialPlatform)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Platform must be one of: ${SOCIAL_PLATFORMS.join(', ')}.`,
    })
  }

  const label = String(body?.label ?? '').trim()
  if (!label) {
    throw createError({ statusCode: 400, statusMessage: 'A link label is required.' })
  }

  return {
    platform: platform as SocialPlatform,
    label,
    url: assertSafeUrl(body?.url),
    sortOrder: Number.isFinite(Number(body?.sortOrder)) ? Number(body.sortOrder) : 0,
    enabled: body?.enabled !== false,
  }
}
