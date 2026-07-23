import type { SkillIconId } from '@/cv-data'
import type { LocalizedString } from '@/shared/types'

export type SkillsShowcaseItem = {
  id: string
  name: LocalizedString
  level: number
  icon: SkillIconId
}

export const skillsCopy = {
  eyebrow: {
    fa: 'مهارت‌ها',
    en: 'Skills',
  },
  title: {
    fa: 'تکنولوژی‌هایی که باهاشون کار می‌کنم',
    en: 'Tech I work with',
  },
  subtitle: {
    fa: 'ابزارها و تکنولوژی‌های اصلی برای ساخت رابط‌های مدرن',
    en: 'Core technologies I use to build modern UIs',
  },
} as const

export const skillsShowcase: SkillsShowcaseItem[] = [
  {
    id: 'vue',
    name: { fa: 'Vue.js', en: 'Vue.js' },
    level: 95,
    icon: 'vue',
  },
  {
    id: 'nuxt',
    name: { fa: 'Nuxt.js', en: 'Nuxt.js' },
    level: 92,
    icon: 'nuxt',
  },
  {
    id: 'react',
    name: { fa: 'React.js', en: 'React.js' },
    level: 85,
    icon: 'react',
  },
  {
    id: 'next',
    name: { fa: 'Next.js', en: 'Next.js' },
    level: 80,
    icon: 'nextjs',
  },
  {
    id: 'typescript',
    name: { fa: 'TypeScript', en: 'TypeScript' },
    level: 88,
    icon: 'typescript',
  },
  {
    id: 'tailwind',
    name: { fa: 'Tailwind CSS', en: 'Tailwind CSS' },
    level: 92,
    icon: 'tailwind',
  },
  {
    id: 'mui',
    name: { fa: 'MUI', en: 'MUI' },
    level: 85,
    icon: 'mui',
  },
  {
    id: 'vuetify',
    name: { fa: 'Vuetify', en: 'Vuetify' },
    level: 85,
    icon: 'vuetify',
  },
  {
    id: 'nestjs',
    name: { fa: 'NestJS', en: 'NestJS' },
    level: 70,
    icon: 'nestjs',
  },
  {
    id: 'git',
    name: { fa: 'Git / GitHub', en: 'Git / GitHub' },
    level: 88,
    icon: 'git',
  },
  {
    id: 'go',
    name: { fa: 'Go Fiber', en: 'Go Fiber' },
    level: 60,
    icon: 'go',
  },
  {
    id: 'sql',
    name: { fa: 'SQL & NoSQL', en: 'SQL & NoSQL' },
    level: 65,
    icon: 'postgresql',
  },
]
