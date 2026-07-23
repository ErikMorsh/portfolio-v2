import type { LocalizedString } from '@/shared/types'

export type ExperienceWorkMode = 'onsite' | 'remote' | 'hybrid'

export type ExperienceShowcaseItem = {
  id: string
  current?: boolean
  period: LocalizedString
  location: LocalizedString
  mode: ExperienceWorkMode
  description: LocalizedString
}

export const experienceCopy = {
  eyebrow: {
    fa: 'سوابق',
    en: 'Experience',
  },
  title: {
    fa: 'کجا کار کرده‌ام',
    en: "Where I've worked",
  },
  subtitle: {
    fa: 'بیش از ۳ سال توسعه حرفه‌ای فرانت‌اند',
    en: '3+ years of professional frontend development',
  },
  current: {
    fa: 'فعلی',
    en: 'Current',
  },
  mode: {
    onsite: { fa: 'حضوری', en: 'Onsite' },
    remote: { fa: 'ریموت', en: 'Remote' },
    hybrid: { fa: 'هیبرید', en: 'Hybrid' },
  },
} as const

export const experienceShowcase: ExperienceShowcaseItem[] = [
  {
    id: 'gostaran-arya-samane',
    current: true,
    period: {
      fa: '۱۴۰۲ — اکنون',
      en: '2023 — Present',
    },
    location: {
      fa: 'تهران، ایران',
      en: 'Tehran, Iran',
    },
    mode: 'hybrid',
    description: {
      fa: 'رهبری بازطراحی معماری فرانت‌اند، ریفکتور کدهای legacy، استانداردسازی کتابخانه‌ها و مشاوره فنی برای پروژه‌های سازمانی Vue و Nuxt.',
      en: 'Led frontend architecture redesign, legacy refactoring, library standardization, and technical consulting for enterprise Vue and Nuxt products.',
    },
  },
  {
    id: 'galaxy-vision',
    period: {
      fa: '۱۴۰۱ — ۱۴۰۲',
      en: '2022 — 2023',
    },
    location: {
      fa: 'تهران، ایران',
      en: 'Tehran, Iran',
    },
    mode: 'onsite',
    description: {
      fa: 'توسعه صفحات واکنش‌گرا و SEO-friendly و پیاده‌سازی CMS چندسایته با Nuxt 3، TypeScript و Tailwind.',
      en: 'Built responsive, SEO-friendly pages and delivered a multi-site CMS with Nuxt 3, TypeScript, and Tailwind.',
    },
  },
  {
    id: 'sama-tarash-pardaz',
    period: {
      fa: '۱۳۹۹ — ۱۴۰۱',
      en: '2020 — 2022',
    },
    location: {
      fa: 'تهران، ایران',
      en: 'Tehran, Iran',
    },
    mode: 'onsite',
    description: {
      fa: 'پیاده‌سازی رابط‌های pixel-perfect، توسعه PWA و آماده‌سازی کد برای اپلیکیشن‌های Electron و Capacitor.',
      en: 'Delivered pixel-perfect UIs, developed PWAs, and prepared codebases for Electron and Capacitor native apps.',
    },
  },
]
