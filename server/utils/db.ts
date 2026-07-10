import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'
import type { H3Event } from 'h3'

export const useDb = (event: H3Event) => {
  // Cloudflare bindings are injected by Nitro into event.context.cloudflare.env
  const dbBinding = event.context.cloudflare?.env?.DB
  
  if (!dbBinding) {
    throw new Error('Cloudflare D1 database binding "DB" is missing in this context. Ensure D1 is configured in wrangler.toml or wrangler.jsonc and you are running under wrangler environment.')
  }
  
  return drizzle(dbBinding, { schema })
}

export type DatabaseInstance = ReturnType<typeof useDb>
