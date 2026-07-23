import type { LocalizedString } from '@/shared/types'

export type HeroNavItem = {
  id: string
  href: string
  labelKey: string
}

export type HeroStat = {
  id: string
  value: string
  label: LocalizedString
  unit?: LocalizedString
  caption?: LocalizedString
}

export const heroNavItems: HeroNavItem[] = [
  { id: 'home', href: '#home', labelKey: 'hero.nav.home' },
  { id: 'about', href: '#about', labelKey: 'hero.nav.about' },
  { id: 'skills', href: '#skills', labelKey: 'hero.nav.skills' },
  { id: 'projects', href: '#projects', labelKey: 'hero.nav.projects' },
  { id: 'experience', href: '#experience', labelKey: 'hero.nav.experience' },
  { id: 'contact', href: '#contact', labelKey: 'hero.nav.contact' },
]

export const heroCopy = {
  availability: {
    fa: 'آماده همکاری · ریموت · حضوری · هیبرید',
    en: 'Available for freelance · Remote · Onsite · Hybrid',
  },
  firstName: {
    fa: 'عرفان',
    en: 'Erfan',
  },
  lastName: {
    fa: 'مرشدزاده',
    en: 'Morshedzadeh',
  },
  taglines: [
    {
      fa: 'ساخت تجربه‌های وب سریع، تمیز و قابل اتکا',
      en: 'Building fast, clean, and reliable web experiences',
    },
    {
      fa: 'تبدیل ایده‌های پیچیده به رابط‌های خوانا و قابل نگهداری',
      en: 'Turning complex ideas into clean, maintainable interfaces',
    },
  ],
  description: {
    fa: 'ایده‌های پیچیده را به رابط‌های خوانا و قابل نگهداری تبدیل می‌کنم — با تمرکز روی معماری فرانت‌اند و تجربه کاربری.',
    en: 'I turn complex ideas into clean, maintainable interfaces — focused on frontend architecture and user experience.',
  },
  viewProjects: {
    fa: 'مشاهده پروژه‌ها',
    en: 'View Projects',
  },
  resume: {
    fa: 'رزومه',
    en: 'Resume',
  },
} as const

export const heroStats: HeroStat[] = [
  {
    id: 'years',
    value: '3+',
    unit: { fa: 'سال', en: 'Years' },
    caption: { fa: 'تجربه', en: 'Experience' },
    label: { fa: 'سال تجربه', en: 'Years experience' },
  },
  {
    id: 'companies',
    value: '3+',
    label: { fa: 'شرکت همکار', en: 'Companies worked' },
  },
  {
    id: 'projects',
    value: '4+',
    label: { fa: 'پروژه تحویل‌شده', en: 'Projects shipped' },
  },
]
