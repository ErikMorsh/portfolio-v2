import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const messages = sqliteTable('messages', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull().default(''),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  status: text('status', { enum: ['unread', 'read'] })
    .notNull()
    .default('unread'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date()),
})

export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert
