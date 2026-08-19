import { useDb } from '~~/server/utils/db'
import { socialLinks } from '~~/server/database/schema'
import { readSocialLinkInput } from '~~/server/utils/socialLinks'

export default defineEventHandler(async (event) => {
  const input = readSocialLinkInput(await readBody(event))

  try {
    const db = useDb(event)
    const [created] = await db.insert(socialLinks).values(input).returning()
    return { success: true, message: 'Social link added.', link: created }
  } catch (error: any) {
    console.error('Failed to create social link:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to save the social link.' })
  }
})
