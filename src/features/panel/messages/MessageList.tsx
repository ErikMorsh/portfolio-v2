import Link from 'next/link'
import type { Message } from '@/db'
import './messages.scss'

type MessageListProps = {
  items: Message[]
}

export function MessageList({ items }: MessageListProps) {
  if (items.length === 0) {
    return <p className="messages-empty">No messages yet.</p>
  }

  return (
    <ul className="messages-list">
      {items.map((item) => {
        const name = [item.firstName, item.lastName].filter(Boolean).join(' ')
        return (
          <li key={item.id}>
            <Link
              className={`messages-list__item ${item.status === 'unread' ? 'messages-list__item--unread' : ''}`}
              href={`/admin/messages/${item.id}`}
            >
              <div className="messages-list__top">
                <strong>{item.subject}</strong>
                <time dateTime={item.createdAt.toISOString()}>
                  {item.createdAt.toLocaleString()}
                </time>
              </div>
              <div className="messages-list__meta">
                <span>{name || '—'}</span>
                <span>{item.email}</span>
                {item.status === 'unread' ? (
                  <span className="messages-list__pill">Unread</span>
                ) : null}
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
