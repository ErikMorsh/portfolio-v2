'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import './messages.scss'

export function MessagesHeader() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <div className="messages-page__header">
      <h1 className="messages-page__title">Messages</h1>
      <button
        className="messages-page__refresh"
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => router.refresh())}
      >
        {pending ? 'Refreshing…' : 'Refresh'}
      </button>
    </div>
  )
}
