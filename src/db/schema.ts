import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const messageStatusEnum = pgEnum('message_status', ['unread', 'read'])

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull().default(''),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  status: messageStatusEnum('status').notNull().default('unread'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert
