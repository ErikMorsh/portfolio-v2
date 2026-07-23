import { auth } from '@/auth'
import { AdminShell } from '@/features/panel/layout/AdminShell'
import { countUnread, listMessages } from '@/features/panel/messages/actions'
import { MessageList } from '@/features/panel/messages/MessageList'
import { redirect } from 'next/navigation'

export default async function AdminMessagesPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/admin/login')
  }

  const [items, unreadCount] = await Promise.all([listMessages(), countUnread()])

  return (
    <AdminShell email={session.user.email} unreadCount={unreadCount}>
      <h1 className="messages-page__title">Messages</h1>
      <MessageList items={items} />
    </AdminShell>
  )
}
