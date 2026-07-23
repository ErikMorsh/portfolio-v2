import { auth } from '@/auth'
import { AdminShell } from '@/features/panel/layout/AdminShell'
import {
  countUnread,
  getMessage,
  markMessageReadOnView,
} from '@/features/panel/messages/actions'
import { MessageDetail } from '@/features/panel/messages/MessageDetail'
import { notFound, redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminMessageDetailPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user) {
    redirect('/admin/login')
  }

  const { id } = await params
  const message = await getMessage(id)
  if (!message) notFound()

  if (message.status === 'unread') {
    await markMessageReadOnView(id)
    message.status = 'read'
  }

  const unreadCount = await countUnread()

  return (
    <AdminShell email={session.user.email} unreadCount={unreadCount}>
      <MessageDetail message={message} />
    </AdminShell>
  )
}
