import type { LocalizedString } from '@/shared/types'

export interface PersonalInfo {
  fullName: LocalizedString
  title: LocalizedString
  email: {
    href: string
    label: string
  }
  phone: string
  location: LocalizedString
  age: number
  militaryService: LocalizedString
  profilePhoto: {
    src: string
    alt: LocalizedString
  }
  linkedin: {
    href: string
    username: string
  }
  /** Replace `public/resume.pdf` with your real CV file. */
  resume: {
    href: string
    fileName: string
  }
}

export interface AboutInfo {
  headline: LocalizedString
  paragraphs: LocalizedString[]
}

export interface ExperienceItem {
  id: string
  title: LocalizedString
  company: LocalizedString
  role: LocalizedString
  duration: LocalizedString
  highlights: LocalizedString[]
  relatedProjectIds?: string[]
  logo: {
    src: string
    alt: LocalizedString
  }
  techStack: string[]
}

export interface ProjectItem {
  id: string
  title: LocalizedString
  subtitle: LocalizedString
  goals: LocalizedString
  actions: LocalizedString[]
  techStack: string[]
  tags: string[]
}

export type SkillIconId =
  | 'vue'
  | 'nuxt'
  | 'typescript'
  | 'react'
  | 'nextjs'
  | 'tailwind'
  | 'vuetify'
  | 'quasar'
  | 'mui'
  | 'nestjs'
  | 'express'
  | 'go'
  | 'postgresql'
  | 'mongodb'
  | 'git'
  | 'github'
  | 'gitlab'
  | 'translate'

export interface SkillItem {
  id: string
  title: LocalizedString
  icons: SkillIconId[]
  glowColor: string
  highlights: LocalizedString[]
}

export interface AbilityItem {
  id: string
  label: LocalizedString
  level: number
}

export interface AbilityGroup {
  id: string
  title: LocalizedString
  items: AbilityItem[]
}

export interface CvData {
  personal: PersonalInfo
  about: AboutInfo
  experience: ExperienceItem[]
  projects: ProjectItem[]
  skills: SkillItem[]
  abilities: AbilityGroup[]
}
