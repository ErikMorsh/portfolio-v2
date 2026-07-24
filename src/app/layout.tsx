import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { cookies } from 'next/headers'
import { AppProviders } from './providers'
import { LOCALE_STORAGE_KEY } from '@/i18n/config/locale-preference'
import { AppLayout } from '@/shared/layout/ui/AppLayout'
import { getGaMeasurementId, isAnalyticsEnabled } from '@/shared/lib/analytics'
import { buildJsonLd, buildRootMetadata } from '@/shared/lib/seo'
import { JsonLd } from '@/shared/seo/JsonLd'
import { isLocale } from '@/shared/types'
import '@/shared/styles/global.scss'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f7fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0a14' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(LOCALE_STORAGE_KEY)?.value
  const locale = raw && isLocale(raw) ? raw : 'fa'
  return buildRootMetadata(locale)
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
  const gaId = isAnalyticsEnabled() ? getGaMeasurementId() : ''

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <JsonLd data={buildJsonLd(locale)} />
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  )
}
