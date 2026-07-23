import type { Metadata } from 'next'
import { AppProviders } from './providers'
import { AppLayout } from '@/shared/layout/ui/AppLayout'
import '@/shared/styles/global.scss'

export const metadata: Metadata = {
  title: 'Portfolio | Erfan Morshedzadeh',
  description:
    'Front-end developer portfolio — Erfan Morshedzadeh. Fast, clean, maintainable web experiences.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  )
}
