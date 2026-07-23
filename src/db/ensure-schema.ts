/** Idempotent bootstrap for a fresh SQLite file (e.g. first boot on Liara). */
export const MESSAGES_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS \`messages\` (
  \`id\` text PRIMARY KEY NOT NULL,
  \`first_name\` text NOT NULL,
  \`last_name\` text DEFAULT '' NOT NULL,
  \`email\` text NOT NULL,
  \`phone\` text,
  \`subject\` text NOT NULL,
  \`body\` text NOT NULL,
  \`status\` text DEFAULT 'unread' NOT NULL,
  \`created_at\` integer NOT NULL
);
`

export async function ensureMessagesSchema(execute: (sql: string) => Promise<unknown>) {
  await execute(MESSAGES_TABLE_SQL)
}
