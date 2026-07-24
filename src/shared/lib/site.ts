/** Canonical production / preview origin for metadata, sitemap, and JSON-LD. */
export function getSiteUrl(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.AUTH_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, '')

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, '')
    return `https://${host}`
  }

  return 'http://localhost:3000'
}

export const siteConfig = {
  name: 'Erfan Morshedzadeh',
  nameFa: 'عرفان مرشدزاده',
  title: 'Front-End Developer',
  titleFa: 'توسعه‌دهنده فرانت‌اند',
  email: 'erfanmorshedzade1376@gmail.com',
  localeDefault: 'fa' as const,
  locales: ['fa', 'en'] as const,
  location: {
    city: 'Tehran',
    cityFa: 'تهران',
    country: 'IR',
  },
  social: {
    github: 'https://github.com/ErikMorsh',
    linkedin: 'https://www.linkedin.com/in/ErfanMorshedzadeh',
  },
} as const
