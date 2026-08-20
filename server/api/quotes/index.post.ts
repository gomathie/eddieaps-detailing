import { useDb } from '~~/server/utils/db'
import { quotes } from '~~/server/database/schema'
import { readString, readEmail, readPhone, readYear, readImageUrls, escapeHtml } from '~~/server/utils/validate'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const input = {
    customerName: readString(body?.customerName, { label: 'Name', max: 120 }),
    customerEmail: readEmail(body?.customerEmail),
    customerPhone: readPhone(body?.customerPhone),
    vehicleMake: readString(body?.vehicleMake, { label: 'Vehicle make', max: 60 }),
    vehicleModel: readString(body?.vehicleModel, { label: 'Vehicle model', max: 60 }),
    vehicleYear: readYear(body?.vehicleYear),
    serviceRequired: readString(body?.serviceRequired, { label: 'Service required', max: 120 }),
    vehicleCondition: readString(body?.vehicleCondition, { label: 'Vehicle condition', max: 2000 }),
    preferredDate: readString(body?.preferredDate, { label: 'Preferred date', required: false, max: 40 }),
    notes: readString(body?.notes, { label: 'Notes', required: false, max: 2000 }),
  }
  const imageUrls = readImageUrls(body?.imageUrls)

  try {
    const db = useDb(event)
    await db.insert(quotes).values({
      ...input,
      imageUrls: JSON.stringify(imageUrls),
      status: 'Pending',
      createdAt: new Date(),
    })

    // escaped: an HTML email built from anonymous visitor input
    await sendNotification(
      event,
      `New Quote Request: ${input.customerName}`,
      `<h2>New quote request</h2>
       <p><strong>Customer:</strong> ${escapeHtml(input.customerName)} (${escapeHtml(input.customerPhone)}, ${escapeHtml(input.customerEmail)})</p>
       <p><strong>Vehicle:</strong> ${input.vehicleYear} ${escapeHtml(input.vehicleMake)} ${escapeHtml(input.vehicleModel)}</p>
       <p><strong>Service required:</strong> ${escapeHtml(input.serviceRequired)}</p>
       <p><strong>Condition:</strong> ${escapeHtml(input.vehicleCondition)}</p>
       <p><strong>Target date:</strong> ${escapeHtml(input.preferredDate) || '&mdash;'}</p>
       <p><strong>Notes:</strong> ${escapeHtml(input.notes) || '&mdash;'}</p>`
    )

    return { success: true, message: 'Quote request saved.' }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Failed to save quote request to D1 database:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save quote request. Please contact us directly at 0595118973.'
    })
  }
})
