import { projects, type ProjectItem } from '@/cv-data'

export type Project = ProjectItem

export const projectPaths = {
  detail: (jobId: string, projectId: string) => `/${jobId}/${projectId}`,
} as const

export const getAllProjects = (): Project[] => projects

export const getProjectById = (id: string): Project | undefined =>
  projects.find((project) => project.id === id)
