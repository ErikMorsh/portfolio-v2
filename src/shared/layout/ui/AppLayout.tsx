import type { ReactNode } from 'react'
import '../styles/layout.scss'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <div className="app-layout__glows" aria-hidden>
        <span className="app-layout__glow app-layout__glow--a" />
        <span className="app-layout__glow app-layout__glow--b" />
        <span className="app-layout__glow app-layout__glow--c" />
        <span className="app-layout__glow app-layout__glow--d" />
      </div>
      <div className="app-layout__shell">{children}</div>
    </div>
  )
}
