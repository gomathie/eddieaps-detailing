import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './app/server/database/schema.ts',
  out: './app/server/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/db.sqlite'
  }
})
