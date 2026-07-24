import type { Metadata } from 'next'
import type { Locale } from '@/shared/types'
import { getSiteUrl, siteConfig } from './site'

type SeoCopy = {
  title: string
  description: string
  keywords: string[]
}

const rootCopy: Record<Locale, SeoCopy> = {
  en: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description:
      'Front-end developer portfolio — Erfan Morshedzadeh. Building fast, clean, maintainable web experiences with React, Next.js, and TypeScript.',
    keywords: [
      'Erfan Morshedzadeh',
      'Front-End Developer',
      'React',
      'Next.js',
      'TypeScript',
      'Portfolio',
      'Web Developer',
      'Tehran',
    ],
  },
  fa: {
    title: `${siteConfig.nameFa} | ${siteConfig.titleFa}`,
    description:
      'پورتفولیو عرفان مرشدزاده — توسعه‌دهنده فرانت‌اند. ساخت تجربهٔ وب سریع، تمیز و قابل‌نگهداری با React، Next.js و TypeScript.',
    keywords: [
      'عرفان مرشدزاده',
      'توسعه‌دهنده فرانت‌اند',
      'React',
      'Next.js',
      'TypeScript',
      'پورتفولیو',
      'تهران',
    ],
  },
}

const pageCopy: Record<
  'home' | 'jobs' | 'resume',
  Record<Locale, SeoCopy>
> = {
  home: rootCopy,
  jobs: {
    en: {
      title: `Work Experience | ${siteConfig.name}`,
      description:
        'Professional work experience and roles — Erfan Morshedzadeh, front-end developer.',
      keywords: ['work experience', 'jobs', 'career', siteConfig.name],
    },
    fa: {
      title: `سوابق کاری | ${siteConfig.nameFa}`,
      description:
        'سوابق شغلی و تجربیات حرفه‌ای عرفان مرشدزاده، توسعه‌دهنده فرانت‌اند.',
      keywords: ['سوابق کاری', 'تجربه شغلی', siteConfig.nameFa],
    },
  },
  resume: {
    en: {
      title: `Resume | ${siteConfig.name}`,
      description:
        'View and download the resume of Erfan Morshedzadeh — front-end developer.',
      keywords: ['resume', 'CV', siteConfig.name, 'front-end'],
    },
    fa: {
      title: `رزومه | ${siteConfig.nameFa}`,
      description:
        'مشاهده و دانلود رزومه عرفان مرشدزاده — توسعه‌دهنده فرانت‌اند.',
      keywords: ['رزومه', 'CV', siteConfig.nameFa, 'فرانت‌اند'],
    },
  },
}

export type PageSeoKey = keyof typeof pageCopy

function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  if (!path || path === '/') return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildPageMetadata(
  page: PageSeoKey,
  locale: Locale,
  path: string,
): Metadata {
  const copy = pageCopy[page][locale]
  const url = absoluteUrl(path)
  const ogLocale = locale === 'fa' ? 'fa_IR' : 'en_US'

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    authors: [{ name: siteConfig.name, url: getSiteUrl() }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: 'technology',
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: page === 'home' ? 'profile' : 'website',
      locale: ogLocale,
      alternateLocale: locale === 'fa' ? ['en_US'] : ['fa_IR'],
      url,
      siteName: `${siteConfig.name} — Portfolio`,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export function buildRootMetadata(locale: Locale): Metadata {
  const page = buildPageMetadata('home', locale, '/')

  return {
    ...page,
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    },
    applicationName: `${siteConfig.name} — Portfolio`,
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  }
}

export function buildJsonLd(locale: Locale) {
  const url = getSiteUrl()
  const name = locale === 'fa' ? siteConfig.nameFa : siteConfig.name
  const jobTitle = locale === 'fa' ? siteConfig.titleFa : siteConfig.title
  const description = pageCopy.home[locale].description
  const city =
    locale === 'fa' ? siteConfig.location.cityFa : siteConfig.location.city

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}/#person`,
    name,
    alternateName:
      locale === 'fa' ? siteConfig.name : siteConfig.nameFa,
    url,
    email: siteConfig.email,
    jobTitle,
    description,
    image: `${url}/opengraph-image`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: siteConfig.location.country,
    },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Front-End Development',
      'Web Performance',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url,
    name: `${name} — Portfolio`,
    description,
    inLanguage: [locale, locale === 'fa' ? 'en' : 'fa'],
    publisher: { '@id': `${url}/#person` },
  }

  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}/#profilepage`,
    url,
    name: pageCopy.home[locale].title,
    description,
    mainEntity: { '@id': `${url}/#person` },
    inLanguage: locale,
  }

  return [person, website, profilePage]
}
