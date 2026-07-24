import type { LocalizedString } from '@/shared/types'

export type AboutHeadline = {
  before: LocalizedString
  accent: LocalizedString
  after: LocalizedString
}

export const aboutCopy = {
  eyebrow: {
    fa: 'درباره من',
    en: 'About Me',
  },
  headline: {
    before: {
      fa: 'علاقه‌مند به توسعه',
      en: 'Passionate about pixels',
    },
    accent: {
      fa: 'و',
      en: '&',
    },
    after: {
      fa: 'پرفورمنس',
      en: 'performance',
    },
  } satisfies AboutHeadline,
  stackSubtitle: {
    fa: 'Vue.js | React.js | Next.js',
    en: 'Vue.js | React.js | Next.js',
  },
  openToWork: {
    fa: 'آماده همکاری',
    en: 'Open to opportunities',
  },
  showLocationMap: {
    fa: 'نمایش نقشه تهران',
    en: 'Show Tehran on the map',
  },
  skillPills: [
    'Vue.js',
    'Nuxt.js',
    'React.js',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'MUI',
    'Pinia',
    'NestJS',
    'Go Fiber',
    'SQL & NoSQL',
    'Git',
  ],
} as const
