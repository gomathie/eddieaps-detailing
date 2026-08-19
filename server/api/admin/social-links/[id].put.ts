import { eq } from 'drizzle-orm'
import { useDb } from '~~/server/utils/db'
import { socialLinks } from '~~/server/database/schema'
import { readSocialLinkInput } from '~~/server/utils/socialLinks'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid social link identification.' })
  }

  const input = readSocialLinkInput(await readBody(event))

  try {
    const db = useDb(event)
    await db.update(socialLinks)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(socialLinks.id, id))
    return { success: true, message: 'Social link updated.' }
  } catch (error: any) {
    console.error(`Failed to update social link ${id}:`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to update the social link.' })
  }
})
