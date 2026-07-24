import type { MetadataRoute } from 'next'
import { siteConfig } from '@/shared/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Portfolio`,
    short_name: siteConfig.name.split(' ')[0],
    description:
      'Front-end developer portfolio — building fast, clean, maintainable web experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0a14',
    theme_color: '#0b0a14',
    lang: 'en',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
