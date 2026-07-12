import { lazy } from 'react'

export const WelcomeLayout = lazy(() =>
  import('@/layouts/WelcomeLayout').then((module) => ({
    default: module.WelcomeLayout,
  })),
)

export const JobsPage = lazy(() =>
  import('@/features/job/page/JobsPage').then((module) => ({
    default: module.JobsPage,
  })),
)

export const SkillDetailContent = lazy(() =>
  import('@/features/skill/components/SkillDetailContent').then((module) => ({
    default: module.SkillDetailContent,
  })),
)

export const JobDetailContent = lazy(() =>
  import('@/features/job/components/JobDetailContent').then((module) => ({
    default: module.JobDetailContent,
  })),
)

export const ProjectDetailContent = lazy(() =>
  import('@/features/project/components/ProjectDetailContent').then((module) => ({
    default: module.ProjectDetailContent,
  })),
)
