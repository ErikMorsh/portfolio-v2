import { abilities } from './content/abilities'
import { about } from './content/about'
import { experience } from './content/experience'
import { personal } from './content/personal'
import { projects } from './content/projects'
import { skills } from './content/skills'
import type { CvData } from './model/types'

export const cvData: CvData = {
  personal,
  about,
  experience,
  projects,
  skills,
  abilities,
}

export * from './model/types'
export * from './lib/localize'
export { abilities, about, experience, personal, projects, skills }
