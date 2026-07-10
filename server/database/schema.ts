import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

// Admin Users
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  password: text('password').notNull(), // Hashed
  role: text('role').notNull().default('admin'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Customer Bookings
export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  vehicleMake: text('vehicle_make').notNull(),
  vehicleModel: text('vehicle_model').notNull(),
  vehicleYear: integer('vehicle_year').notNull(),
  vehicleType: text('vehicle_type').notNull(), // e.g. Sedan, SUV, Truck, etc.
  serviceName: text('service_name').notNull(),
  preferredDate: text('preferred_date').notNull(),
  preferredTime: text('preferred_time').notNull(),
  address: text('address'), // null for stationed services
  notes: text('notes'),
  imageUrls: text('image_urls').notNull().default('[]'), // JSON array of strings
  status: text('status').notNull().default('Pending'), // Pending, Confirmed, Completed, Cancelled
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Quote Requests
export const quotes = sqliteTable('quotes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  vehicleMake: text('vehicle_make').notNull(),
  vehicleModel: text('vehicle_model').notNull(),
  vehicleYear: integer('vehicle_year').notNull(),
  serviceRequired: text('service_required').notNull(),
  vehicleCondition: text('vehicle_condition').notNull(), // e.g. Fair, Needs Work, Extremely Dirty
  imageUrls: text('image_urls').notNull().default('[]'), // JSON array of strings
  preferredDate: text('preferred_date'),
  status: text('status').notNull().default('Pending'), // Pending, Sent, Accepted, Rejected
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Dynamic Detailing Services
export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  benefits: text('benefits').notNull().default('[]'), // JSON array of strings
  process: text('process').notNull().default('[]'), // JSON array of strings (steps)
  basePrice: real('base_price').notNull(),
  duration: text('duration').notNull(), // e.g. "3-4 hours"
  imageUrl: text('image_url').notNull(),
  faqs: text('faqs').notNull().default('[]'), // JSON array of { q: string, a: string }
})

// Before & After Gallery
export const gallery = sqliteTable('gallery', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  beforeImage: text('before_image').notNull(), // R2 url or local
  afterImage: text('after_image').notNull(), // R2 url or local
  category: text('category').notNull(), // Interior, Exterior, Paint Correction, Engine, Headlight
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Testimonials / Reviews
export const testimonials = sqliteTable('testimonials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  author: text('author').notNull(),
  rating: integer('rating').notNull(), // 1 to 5
  content: text('content').notNull(),
  date: text('date').notNull(), // String format (e.g., 'June 2026')
  approved: integer('approved', { mode: 'boolean' }).notNull().default(false), // 0/1 for admin approval
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Blog System
export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(), // Markdown formatted
  excerpt: text('excerpt').notNull(),
  category: text('category').notNull(), // Car Care Tips, Interior Cleaning, Paint Protection, etc.
  tags: text('tags').notNull().default('[]'), // JSON array of strings
  author: text('author').notNull().default('Eddie APS Detailing'),
  imageUrl: text('image_url').notNull(),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Contact Messages
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('unread'), // unread, read, archived
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})
