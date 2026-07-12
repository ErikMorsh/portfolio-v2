import type { ReactNode } from 'react'
import '../styles/layout.scss'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <div className="app-layout__shell">{children}</div>
    </div>
  )
}
