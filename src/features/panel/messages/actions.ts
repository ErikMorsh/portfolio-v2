'use server'

import { count, desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { db, messages, type Message } from '@/db'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/admin/login')
  }
  return session
}

export async function listMessages(): Promise<Message[]> {
  await requireAdmin()
  return db.select().from(messages).orderBy(desc(messages.createdAt))
}

export async function getMessage(id: string): Promise<Message | null> {
  await requireAdmin()
  const [row] = await db.select().from(messages).where(eq(messages.id, id)).limit(1)
  return row ?? null
}

export async function markMessageStatus(id: string, status: 'read' | 'unread') {
  await requireAdmin()
  await db.update(messages).set({ status }).where(eq(messages.id, id))
  revalidatePath('/admin/messages')
  revalidatePath(`/admin/messages/${id}`)
}

/** Mark unread → read during page load (no revalidatePath — unsafe during render). */
export async function markMessageReadOnView(id: string) {
  await requireAdmin()
  await db
    .update(messages)
    .set({ status: 'read' })
    .where(eq(messages.id, id))
}

export async function deleteMessage(id: string) {
  await requireAdmin()
  await db.delete(messages).where(eq(messages.id, id))
  revalidatePath('/admin/messages')
  redirect('/admin/messages')
}

export async function countUnread(): Promise<number> {
  await requireAdmin()
  const [row] = await db
    .select({ value: count() })
    .from(messages)
    .where(eq(messages.status, 'unread'))
  return row?.value ?? 0
}
