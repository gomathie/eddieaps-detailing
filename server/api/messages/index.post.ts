import { useDb } from '~~/server/utils/db'
import { messages } from '~~/server/database/schema'
import { readString, readEmail, readPhone, escapeHtml } from '~~/server/utils/validate'
import { assertCountryAllowed } from '~~/server/utils/geoblock'
import { assertHumanVerified } from '~~/server/utils/turnstile'

export default defineEventHandler(async (event) => {
  assertCountryAllowed(event)

  const body = await readBody(event)

  // bot check before any parsing or database work
  await assertHumanVerified(event, body?.turnstileToken)

  const input = {
    name: readString(body?.name, { label: 'Name', max: 120 }),
    email: readEmail(body?.email),
    phone: readPhone(body?.phone),
    message: readString(body?.message, { label: 'Message', max: 5000, min: 2 }),
  }

  try {
    const db = useDb(event)
    await db.insert(messages).values({
      ...input,
      status: 'unread',
      createdAt: new Date(),
    })

    // every field is escaped: this is an HTML email, and the values come
    // straight from an anonymous visitor
    await sendNotification(
      event,
      `New Message: ${input.name}`,
      `<h2>New contact message</h2>
       <p><strong>From:</strong> ${escapeHtml(input.name)} (${escapeHtml(input.phone)}, ${escapeHtml(input.email)})</p>
       <p><strong>Message:</strong></p>
       <p>${escapeHtml(input.message).replace(/\n/g, '<br>')}</p>`
    )

    return { success: true, message: 'Your message has been sent successfully.' }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Failed to store contact message in D1 database:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit contact message. Please contact us directly at 0595118973.'
    })
  }
})
