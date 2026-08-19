export interface ServiceFaq {
  q: string
  a: string
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
