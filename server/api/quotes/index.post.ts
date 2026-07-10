import { useDb } from '~~/server/utils/db'
import { quotes } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validation
  const requiredFields = [
    'customerName', 'customerEmail', 'customerPhone',
    'vehicleMake', 'vehicleModel', 'vehicleYear',
    'serviceRequired', 'vehicleCondition'
  ]

  for (const field of requiredFields) {
    if (!body[field]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required quote field: ${field}`
      })
    }
  }

  try {
    const db = useDb(event)
    await db.insert(quotes).values({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      vehicleMake: body.vehicleMake,
      vehicleModel: body.vehicleModel,
      vehicleYear: Number(body.vehicleYear),
      serviceRequired: body.serviceRequired,
      vehicleCondition: body.vehicleCondition,
      preferredDate: body.preferredDate || '',
      notes: body.notes || '',
      imageUrls: JSON.stringify(body.imageUrls || []),
      status: 'Pending',
      createdAt: new Date()
    })

    return { success: true, message: 'Quote request saved.' }
  } catch (error: any) {
    console.error('Failed to save quote request to D1 database:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save quote request. Please contact us directly at 0595118973.'
    })
  }
})
