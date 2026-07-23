import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { ensureMessagesSchema } from './ensure-schema'
import * as schema from './schema'

function resolveDbUrl() {
  const raw = process.env.DATABASE_URL ?? 'file:./data/portfolio.db'
  const withoutScheme = raw.replace(/^file:/, '')
  const absolutePath = path.isAbsolute(withoutScheme)
    ? withoutScheme
    : path.resolve(process.cwd(), withoutScheme)

  fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
  return pathToFileURL(absolutePath).href
}

const url = resolveDbUrl()

const globalForDb = globalThis as unknown as {
  sqliteClient?: ReturnType<typeof createClient>
  schemaReady?: Promise<void>
}

const client =
  globalForDb.sqliteClient ??
  createClient({
    url,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForDb.sqliteClient = client
}

globalForDb.schemaReady ??= ensureMessagesSchema((sql) => client.execute(sql)).then(
  () => undefined,
)
await globalForDb.schemaReady

export const db = drizzle(client, { schema })

export * from './schema'
