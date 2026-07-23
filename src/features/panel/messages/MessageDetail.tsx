import Link from 'next/link'
import type { Message } from '@/db'
import { deleteMessage, markMessageStatus } from './actions'
import './messages.scss'

type MessageDetailProps = {
  message: Message
}

export function MessageDetail({ message }: MessageDetailProps) {
  const name = [message.firstName, message.lastName].filter(Boolean).join(' ')
  const nextStatus = message.status === 'unread' ? 'read' : 'unread'
  const markAction = markMessageStatus.bind(null, message.id, nextStatus)
  const removeAction = deleteMessage.bind(null, message.id)

  return (
    <article className="message-detail">
      <div className="message-detail__toolbar">
        <Link className="message-detail__back" href="/admin/messages">
          ← Back
        </Link>
        <div className="message-detail__actions">
          <form action={markAction}>
            <button type="submit">Mark as {nextStatus}</button>
          </form>
          <form action={removeAction}>
            <button className="message-detail__danger" type="submit">
              Delete
            </button>
          </form>
        </div>
      </div>

      <header className="message-detail__header">
        <h1>{message.subject}</h1>
        <p>
          From <strong>{name || '—'}</strong> ·{' '}
          <a href={`mailto:${message.email}`}>{message.email}</a>
          {message.phone ? (
            <>
              {' '}
              · <a href={`tel:${message.phone}`}>{message.phone}</a>
            </>
          ) : null}
        </p>
        <time dateTime={message.createdAt.toISOString()}>
          {message.createdAt.toLocaleString()}
        </time>
      </header>

      <div className="message-detail__body">{message.body}</div>
    </article>
  )
}
