import Link from 'next/link'
import { logoutAction } from '@/features/panel/auth/actions'
import './admin-shell.scss'

type AdminShellProps = {
  email?: string | null
  unreadCount?: number
  children: React.ReactNode
}

export function AdminShell({ email, unreadCount = 0, children }: AdminShellProps) {
  return (
    <div className="admin-shell">
      <aside className="admin-shell__sidebar">
        <div className="admin-shell__brand">Panel</div>
        <nav className="admin-shell__nav" aria-label="Admin">
          <Link className="admin-shell__nav-link" href="/admin/messages">
            Messages
            {unreadCount > 0 ? (
              <span className="admin-shell__badge">{unreadCount}</span>
            ) : null}
          </Link>
        </nav>
      </aside>
      <div className="admin-shell__main">
        <header className="admin-shell__header">
          <span className="admin-shell__email">{email ?? 'Admin'}</span>
          <form action={logoutAction}>
            <button className="admin-shell__logout" type="submit">
              Sign out
            </button>
          </form>
        </header>
        <div className="admin-shell__content">{children}</div>
      </div>
    </div>
  )
}
