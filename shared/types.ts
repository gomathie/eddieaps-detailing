export interface ServiceFaq {
  q: string
  a: string
}

interface GalleryItemBase {
  id: number
  title: string
  category: string
}

/** A before/after comparison the visitor can drag through. */
export interface GallerySliderItem extends GalleryItemBase {
  type: 'slider'
  before: string
  after: string
}

/** A single photo opened in the lightbox. */
export interface GalleryImageItem extends GalleryItemBase {
  type: 'image'
  url: string
}

/**
 * Discriminated on `type` so a `v-if="item.type === 'slider'"` branch narrows to
 * the variant that actually carries the image fields.
 */
export type GalleryItem = GallerySliderItem | GalleryImageItem

/** An admin portal account. The password hash is never sent to the client. */
export interface AdminUser {
  id: number
  username: string
  role: string
  /** Optional profile details; null on accounts created before these existed. */
  fullName: string | null
  email: string | null
  phone: string | null
  createdAt: string | Date | null
}

/** A social link as rendered by the footer. */
export interface SocialLink {
  id: number
  platform: string
  label: string
  url: string
  sortOrder: number
  enabled: boolean
}

/**
 * The shape a service detail page renders. Both the API's static fallback
 * catalog and the page's own offline catalog conform to this, so the two
 * branches of `useFetch` agree on a single type.
 */
export interface ServiceDetail {
  name: string
  description: string
  basePrice: number
  duration: string
  imageUrl: string
  benefits: string[]
  process: string[]
  faqs: ServiceFaq[]
}
