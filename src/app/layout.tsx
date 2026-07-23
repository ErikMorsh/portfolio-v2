import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { AppProviders } from './providers'
import { LOCALE_STORAGE_KEY } from '@/i18n/config/locale-preference'
import { AppLayout } from '@/shared/layout/ui/AppLayout'
import { isLocale } from '@/shared/types'
import '@/shared/styles/global.scss'

export const metadata: Metadata = {
  title: 'Portfolio | Erfan Morshedzadeh',
  description:
    'Front-end developer portfolio — Erfan Morshedzadeh. Fast, clean, maintainable web experiences.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const raw = cookieStore.get(LOCALE_STORAGE_KEY)?.value
  const locale = raw && isLocale(raw) ? raw : 'fa'
  const dir = locale === 'fa' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  )
}
