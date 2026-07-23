import type { LocalizedString } from '@/shared/types'

export type ProjectsShowcaseIcon =
  | 'crm'
  | 'chat'
  | 'cms'
  | 'migration'

export type ProjectsShowcaseItem = {
  id: string
  featured?: boolean
  icon: ProjectsShowcaseIcon
  description: LocalizedString
  tech: string[]
  githubUrl?: string
  liveUrl?: string
}

export const projectsCopy = {
  eyebrow: {
    fa: 'پروژه‌ها',
    en: 'Projects',
  },
  title: {
    fa: 'چیزهایی که ساخته‌ام',
    en: "Things I've built",
  },
  subtitle: {
    fa: 'پلتفرم‌ها و محصولات واقعی از مسیر حرفه‌ای من',
    en: 'Real-world platforms and products from my experience',
  },
  featured: {
    fa: 'ویژه',
    en: 'Featured',
  },
  viewDetails: {
    fa: 'مشاهده جزئیات',
    en: 'View details',
  },
  github: {
    fa: 'مشاهده در GitHub',
    en: 'View on GitHub',
  },
} as const

export const projectsShowcase: ProjectsShowcaseItem[] = [
  {
    id: 'crm',
    featured: true,
    icon: 'crm',
    description: {
      fa: 'بازطراحی زیرساخت فرانت‌اند CRM سازمانی با معماری feature-based، مدیریت نقش و اعلان لحظه‌ای.',
      en: 'Enterprise CRM frontend rebuild with feature-based architecture, role management, and push notifications.',
    },
    tech: ['Vue.js', 'Nuxt', 'TypeScript', 'Vuetify'],
  },
  {
    id: 'chat',
    icon: 'chat',
    description: {
      fa: 'زیرساخت پیام‌رسانی بلادرنگ با WebSocket، قابلیت‌های چت و تماس peer-to-peer.',
      en: 'Real-time messaging infrastructure with WebSocket, chat features, and peer-to-peer calls.',
    },
    tech: ['Vue.js', 'TypeScript', 'Vuetify', 'Peer.js'],
  },
  {
    id: 'cms',
    icon: 'cms',
    description: {
      fa: 'پلتفرم CMS چندسایته با page builder، بهینه‌سازی SEO و معماری لایه‌ای Nuxt.',
      en: 'Multi-site CMS platform with page builder, SEO optimization, and Nuxt layered architecture.',
    },
    tech: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'vue-migration',
    icon: 'migration',
    description: {
      fa: 'مدرن‌سازی فرانت‌اند به Vue 3 به‌همراه PWA، Electron و اپلیکیشن موبایل Capacitor.',
      en: 'Frontend modernization to Vue 3 with PWA, Electron desktop, and Capacitor mobile apps.',
    },
    tech: ['Vue 3', 'Pinia', 'PWA', 'Electron'],
  },
]
