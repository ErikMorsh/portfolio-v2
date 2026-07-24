import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { JobsPage } from '@/features/portfolio/job/page/JobsPage'
import { LOCALE_STORAGE_KEY } from '@/i18n/config/locale-preference'
import { buildPageMetadata } from '@/shared/lib/seo'
import { isLocale } from '@/shared/types'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(LOCALE_STORAGE_KEY)?.value
  const locale = raw && isLocale(raw) ? raw : 'fa'
  return buildPageMetadata('jobs', locale, '/jobs')
}

export default function JobsRoutePage() {
  return <JobsPage />
}
