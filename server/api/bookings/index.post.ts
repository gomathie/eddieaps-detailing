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

    return { success: true, message: 'Booking logged successfully.' }
  } catch (error: any) {
    console.error('Failed to write booking to D1 database:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to record booking request. Please call us at 0595118973 to secure your slot.'
    })
  }
})
