export interface ServiceFaq {
  q: string
  a: string
}

/** An admin portal account. The password hash is never sent to the client. */
export interface AdminUser {
  id: number
  username: string
  role: string
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
