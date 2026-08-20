import { useDb } from '~~/server/utils/db'
import { bookings } from '~~/server/database/schema'
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
    vehicleType: readString(body?.vehicleType, { label: 'Vehicle type', max: 60 }),
    serviceName: readString(body?.serviceName, { label: 'Service', max: 120 }),
    preferredDate: readString(body?.preferredDate, { label: 'Preferred date', max: 40 }),
    preferredTime: readString(body?.preferredTime, { label: 'Preferred time', max: 40 }),
    address: readString(body?.address, { label: 'Address', required: false, max: 500 }),
    notes: readString(body?.notes, { label: 'Notes', required: false, max: 2000 }),
  }
  const imageUrls = readImageUrls(body?.imageUrls)

  try {
    const db = useDb(event)
    await db.insert(bookings).values({
      ...input,
      imageUrls: JSON.stringify(imageUrls),
      status: 'Pending',
      createdAt: new Date(),
    })

    // escaped: an HTML email built from anonymous visitor input
    await sendNotification(
      event,
      `New Booking: ${input.customerName}`,
      `<h2>New booking request</h2>
       <p><strong>Customer:</strong> ${escapeHtml(input.customerName)} (${escapeHtml(input.customerPhone)}, ${escapeHtml(input.customerEmail)})</p>
       <p><strong>Vehicle:</strong> ${input.vehicleYear} ${escapeHtml(input.vehicleMake)} ${escapeHtml(input.vehicleModel)} (${escapeHtml(input.vehicleType)})</p>
       <p><strong>Service:</strong> ${escapeHtml(input.serviceName)}</p>
       <p><strong>Preferred:</strong> ${escapeHtml(input.preferredDate)} at ${escapeHtml(input.preferredTime)}</p>
       <p><strong>Address:</strong> ${escapeHtml(input.address) || 'Stationed facility'}</p>
       <p><strong>Notes:</strong> ${escapeHtml(input.notes) || '&mdash;'}</p>`
    )

    return { success: true, message: 'Booking logged successfully.' }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Failed to write booking to D1 database:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to record booking request. Please call us at 0595118973 to secure your slot.'
    })
  }
})
