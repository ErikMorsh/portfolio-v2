import type { ReactNode } from 'react'

type PageProps = {
  children: ReactNode
  className?: string
}

export function Page({ children, className }: PageProps) {
  const classes = ['layout-page', className].filter(Boolean).join(' ')

  return (
    <main className={classes}>
      {children}
    </main>
  )
}
