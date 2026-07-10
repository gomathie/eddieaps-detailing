import { useDb } from '~~/server/utils/db'
import { quotes } from '~~/server/database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    return await db.select().from(quotes).orderBy(desc(quotes.createdAt))
  } catch (error) {
    console.warn('Failed to query admin quotes from D1 database. Serving local fallback.', error)
    
    // Mocks for dashboard preview
    return [
      {
        id: 1,
        customerName: 'George K.',
        customerEmail: 'george@example.com',
        customerPhone: '0595118973',
        vehicleMake: 'Ford',
        vehicleModel: 'F-150',
        vehicleYear: 2021,
        serviceRequired: 'Multiple Vehicles / Custom Package',
        vehicleCondition: 'Extremely Dirty',
        preferredDate: '2026-07-08',
        notes: 'Need quote for Ford F-150 and a Toyota RAV4 in the same driveway.',
        status: 'Pending',
        createdAt: new Date('2026-06-30')
      }
    ]
  }
})
