import { Box, Chip, Paper, Typography } from '@mui/material'
import '../styles/project.scss'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'
import { pickLocale, pickLocaleList } from '@/cv-data'
import { getJobById, jobPaths } from '@/features/portfolio/job'
import { Main2Toolbar } from '@/features/portfolio/welcome/components'
import { useAppTheme } from '@/theme'
import { getProjectById } from '../lib/projects'

export function ProjectDetailContent() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()
  const router = useRouter()
  const params = useParams<{ jobId?: string; projectId?: string }>()
  const jobId = typeof params.jobId === 'string' ? params.jobId : undefined
  const projectId = typeof params.projectId === 'string' ? params.projectId : undefined

  const job = jobId ? getJobById(jobId) : undefined
  const project = projectId ? getProjectById(projectId) : undefined
  const isValid =
    Boolean(jobId && projectId && job && project && job.relatedProjectIds?.includes(projectId))

  useEffect(() => {
    if (!isValid) router.replace('/')
  }, [isValid, router])

  if (!jobId || !projectId || !job || !project || !job.relatedProjectIds?.includes(projectId)) {
    return null
  }

  const actions = pickLocaleList(project.actions, locale)
  const backTo = jobPaths.detail(jobId)
  const projectTitle = pickLocale(project.title, locale)

  const breadcrumbItems = [
    { label: t('nav.home'), to: '/' },
    {
      label: pickLocale(job.title, locale),
      to: jobPaths.detail(jobId),
    },
    { label: projectTitle },
  ]

  return (
    <Box className="welcome__main2-content">
      <Main2Toolbar backTo={backTo} items={breadcrumbItems} />

      <Paper className="job-detail" elevation={0}>
        <Box className="job-detail__header-content">
          <Typography className="job-detail__company" component="h1" variant="h6">
            {projectTitle}
          </Typography>

          <Typography className="job-detail__role" color="primary" variant="body2">
            {pickLocale(project.subtitle, locale)}
          </Typography>
        </Box>

        <Box className="job-detail__section job-detail__goals">
          <Typography className="job-detail__section-title" component="h2" variant="subtitle1">
            {t('project.goals')}
          </Typography>

          <Typography className="job-detail__highlight" variant="body2" color="text.secondary">
            {pickLocale(project.goals, locale)}
          </Typography>
        </Box>

        <Box className="job-detail__section job-detail__actions">
          <Typography className="job-detail__section-title" component="h2" variant="subtitle1">
            {t('project.actions')}
          </Typography>

          <Box className="job-detail__highlights" component="ul">
            {actions.map((action) => (
              <Typography
                key={action}
                className="job-detail__highlight"
                component="li"
                variant="body2"
                color="text.secondary"
              >
                {action}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box className="job-detail__section job-detail__tech-stack">
          <Typography className="job-detail__section-title" component="h2" variant="subtitle1">
            {t('project.techStack')}
          </Typography>

          <Box className="job-detail__tags">
            {project.techStack.map((tech) => (
              <Chip key={tech} label={tech} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
