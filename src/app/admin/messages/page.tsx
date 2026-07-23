import { auth } from '@/auth'
import { AdminShell } from '@/features/panel/layout/AdminShell'
import { countUnread, listMessages } from '@/features/panel/messages/actions'
import { MessageList } from '@/features/panel/messages/MessageList'
import { MessagesHeader } from '@/features/panel/messages/MessagesHeader'
import { redirect } from 'next/navigation'

export default async function AdminMessagesPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/admin/login')
  }

  const [items, unreadCount] = await Promise.all([listMessages(), countUnread()])

  return (
    <AdminShell email={session.user.email} unreadCount={unreadCount}>
      <MessagesHeader />
      <MessageList items={items} />
    </AdminShell>
  )
}
