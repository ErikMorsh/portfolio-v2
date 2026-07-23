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
