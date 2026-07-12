import { experience, projects, type ExperienceItem } from '@/cv-data'

export type Job = ExperienceItem

export const jobPaths = {
  list: '/jobs',
  detail: (id: string) => `/${id}`,
} as const

export const getAllJobs = (): Job[] => experience

export const getJobById = (id: string): Job | undefined =>
  experience.find((job) => job.id === id)

export const getJobForProject = (projectId: string): Job | undefined =>
  experience.find((job) => job.relatedProjectIds?.includes(projectId))

export const getJobProjects = (job: Job) =>
  projects.filter((project) => job.relatedProjectIds?.includes(project.id))
