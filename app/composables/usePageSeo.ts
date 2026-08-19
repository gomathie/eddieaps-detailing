const SITE_NAME = 'Eddie APS Detailing'

interface PageSeo {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Page-specific social card. Root-relative or absolute; falls back to the site card. */
  image?: MaybeRefOrGetter<string | undefined>
  type?: 'website' | 'article'
}

/**
 * Sets the page title and description, and mirrors them onto the Open Graph and
 * Twitter tags. Without those mirrors the social platforms fall back to the
 * site-wide defaults, so every page would share one identical link preview.
 */
export const usePageSeo = (seo: PageSeo) => {
  const { public: { siteUrl } } = useRuntimeConfig()
  const route = useRoute()

  const title = () => toValue(seo.title)
  const description = () => toValue(seo.description)
  const socialTitle = () => `${title()} | ${SITE_NAME}`
  const socialImage = () => {
    const image = toValue(seo.image)
    return image ? new URL(image, siteUrl).href : `${siteUrl}/og-image.png`
  }

  useSeoMeta({
    title,
    description,
    ogTitle: socialTitle,
    ogDescription: description,
    ogType: seo.type ?? 'website',
    ogUrl: () => `${siteUrl}${route.path}`,
    ogImage: socialImage,
    twitterTitle: socialTitle,
    twitterDescription: description,
    twitterImage: socialImage,
  })
}
