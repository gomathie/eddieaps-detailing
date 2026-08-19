import type { blogPosts } from '~~/server/database/schema'

type BlogPostRow = typeof blogPosts.$inferSelect

const WORDS_PER_MINUTE = 200

/** D1 stores a timestamp; the UI renders a date string like "June 18, 2026". */
export const formatPostDate = (value: Date | null) =>
  (value ?? new Date()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

/** D1 stores the article body; the UI renders a reading estimate. */
export const estimateReadTime = (content: string) => {
  const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`
}

/**
 * Database rows carry `createdAt` and `content`, while the static fallbacks
 * carry the presentational `date` and `readTime` the templates actually read.
 * Normalise the row so both branches of every blog endpoint return one shape.
 */
export const withPostMeta = (post: BlogPostRow) => ({
  ...post,
  date: formatPostDate(post.createdAt),
  readTime: estimateReadTime(post.content),
})
