import { skills, type SkillItem } from '@/cv-data'

export type Skill = SkillItem

export const skillPaths = {
  detail: (id: string) => `/skills/${id}`,
} as const

export const getAllSkills = (): Skill[] => skills

export const getSkillById = (id: string): Skill | undefined =>
  skills.find((skill) => skill.id === id)
