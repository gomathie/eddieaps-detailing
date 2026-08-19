import { useDb } from '~~/server/utils/db'
import { bookings } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validation
  const requiredFields = [
    'customerName', 'customerEmail', 'customerPhone',
    'vehicleMake', 'vehicleModel', 'vehicleYear', 'vehicleType',
    'serviceName', 'preferredDate', 'preferredTime'
  ]

  for (const field of requiredFields) {
    if (!body[field]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required booking field: ${field}`
      })
    }
  }

  try {
    const db = useDb(event)
    await db.insert(bookings).values({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      vehicleMake: body.vehicleMake,
      vehicleModel: body.vehicleModel,
      vehicleYear: Number(body.vehicleYear),
      vehicleType: body.vehicleType,
      serviceName: body.serviceName,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      address: body.address || '',
      notes: body.notes || '',
      imageUrls: JSON.stringify(body.imageUrls || []),
      status: 'Pending',
      createdAt: new Date()
    })

    await sendNotification(
      event,
      `New Booking: ${body.customerName}`,
      `<h2>New booking request</h2>
       <p><strong>Customer:</strong> ${body.customerName} (${body.customerPhone}, ${body.customerEmail})</p>
       <p><strong>Vehicle:</strong> ${body.vehicleYear} ${body.vehicleMake} ${body.vehicleModel} (${body.vehicleType})</p>
       <p><strong>Service:</strong> ${body.serviceName}</p>
       <p><strong>Preferred:</strong> ${body.preferredDate} at ${body.preferredTime}</p>
       <p><strong>Address:</strong> ${body.address || 'Stationed facility'}</p>
       <p><strong>Notes:</strong> ${body.notes || '—'}</p>`
    )

    return { success: true, message: 'Booking logged successfully.' }
  } catch (error: any) {
    console.error('Failed to write booking to D1 database:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to record booking request. Please call us at 0595118973 to secure your slot.'
    })
  }
})
