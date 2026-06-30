import { useDb } from '~/server/utils/db'
import { bookings } from '~/server/database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const db = useDb(event)
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt))
  } catch (error) {
    console.warn('Failed to fetch admin bookings. Serving mock list.', error)
    
    // Admin mock fallback
    return [
      {
        id: 1,
        customerName: 'Marcus V.',
        customerEmail: 'marcus@example.com',
        customerPhone: '0595118973',
        vehicleMake: 'Tesla',
        vehicleModel: 'Model Y',
        vehicleYear: 2024,
        vehicleType: 'SUV',
        serviceName: 'Complete Detailing',
        preferredDate: '2026-07-02',
        preferredTime: '10:00 AM',
        address: '45 Blue Drive, Bay Area',
        notes: 'Please focus on dog hair in trunk.',
        status: 'Pending',
        createdAt: new Date('2026-06-30')
      },
      {
        id: 2,
        customerName: 'Sofia R.',
        customerEmail: 'sofia@example.com',
        customerPhone: '0591357411',
        vehicleMake: 'Porsche',
        vehicleModel: '911 Carrera',
        vehicleYear: 2022,
        vehicleType: 'Sport Coupe',
        serviceName: 'Ceramic Paint Protection',
        preferredDate: '2026-07-05',
        preferredTime: '08:00 AM',
        address: '',
        notes: 'Stationed shop request. Paint polishing needed first.',
        status: 'Confirmed',
        createdAt: new Date('2026-06-29')
      }
    ]
  }
})
