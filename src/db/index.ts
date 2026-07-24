import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createClient, type Client } from '@libsql/client'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'
import { ensureMessagesSchema } from './ensure-schema'
import * as schema from './schema'

export type AppDatabase = LibSQLDatabase<typeof schema>

function resolveDbUrl() {
  const raw = process.env.DATABASE_URL ?? 'file:./data/portfolio.db'
  const withoutScheme = raw.replace(/^file:/, '')
  const absolutePath = path.isAbsolute(withoutScheme)
    ? withoutScheme
    : path.resolve(process.cwd(), withoutScheme)

  fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
  return pathToFileURL(absolutePath).href
}

const globalForDb = globalThis as unknown as {
  sqliteClient?: Client
  drizzleDb?: AppDatabase
  schemaReady?: Promise<void>
}

function isNextBuildPhase() {
  return process.env.NEXT_PHASE === 'phase-production-build'
}

function getClient() {
  if (!globalForDb.sqliteClient) {
    globalForDb.sqliteClient = createClient({ url: resolveDbUrl() })
  }
  return globalForDb.sqliteClient
}

async function ensureReady() {
  // Avoid opening SQLite while Next collects page data during `next build`
  // (parallel workers → SQLITE_BUSY / locked file).
  if (isNextBuildPhase()) return

  if (!globalForDb.schemaReady) {
    const client = getClient()
    globalForDb.schemaReady = ensureMessagesSchema((sql) =>
      client.execute(sql),
    ).then(() => undefined)
  }
  await globalForDb.schemaReady
}

/** Lazy DB accessor — safe to import during build; connects on first real use. */
export async function getDatabase(): Promise<AppDatabase> {
  await ensureReady()
  if (isNextBuildPhase()) {
    throw new Error('Database is not available during the Next.js build phase.')
  }
  if (!globalForDb.drizzleDb) {
    globalForDb.drizzleDb = drizzle(getClient(), { schema })
  }
  return globalForDb.drizzleDb
}

export * from './schema'
