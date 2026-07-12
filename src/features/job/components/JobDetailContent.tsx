import { Box, Chip, Paper, Typography } from '@mui/material'
import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import { pickLocale, pickLocaleList } from '@/cv-data'
import { Main2Toolbar } from '@/features/welcome/components'
import { ProjectCard } from '@/features/project'
import { useAppTheme } from '@/theme'
import { getJobById, getJobProjects } from '../lib/jobs'

export function JobDetailContent() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()
  const { jobId } = useParams<{ jobId: string }>()

  if (!jobId) {
    return <Navigate to="/" replace />
  }

  const job = getJobById(jobId)

  if (!job) {
    return <Navigate to="/" replace />
  }

  const relatedProjects = getJobProjects(job)
  const highlights = pickLocaleList(job.highlights, locale)
  const companyName = pickLocale(job.company, locale)

  return (
    <Box className="welcome__main2-content">
      <Main2Toolbar
        backTo="/"
        items={[
          { label: t('nav.home'), to: '/' },
          { label: companyName },
        ]}
      />

      <Paper className="job-detail" elevation={0}>
        <Box className="job-detail__header">
          <Box className="job-detail__logo-wrap">
            <img
              className="job-detail__logo"
              src={job.logo.src}
              alt={pickLocale(job.logo.alt, locale)}
            />
          </Box>

          <Box className="job-detail__header-content">
            <Typography className="job-detail__company" component="h1" variant="h6">
              {companyName}
            </Typography>

            <Typography className="job-detail__role" color="primary" variant="h6">
              {pickLocale(job.role, locale)}
            </Typography>

            <Typography className="job-detail__duration" color="text.secondary" variant="body2">
              {t('job.duration')}: {pickLocale(job.duration, locale)}
            </Typography>
          </Box>
        </Box>

        <Box className="job-detail__section">
          <Box className="job-detail__tags">
            {job.techStack.map((tech) => (
              <Chip key={tech} label={tech} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Box className="job-detail__highlights" component="ul">
          {highlights.map((highlight) => (
            <Typography
              key={highlight}
              className="job-detail__highlight"
              component="li"
              variant="body2"
              color="text.secondary"
            >
              {highlight}
            </Typography>
          ))}
        </Box>

        {relatedProjects.length > 0 && (
          <Box className="job-detail__section">
            <Typography className="job-detail__section-title" component="h2" variant="subtitle1">
              {t('job.relatedProjects')}
            </Typography>

            <Box className="job-detail__projects">
              {relatedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  className="job-detail__project-card"
                  hideJobMeta
                  jobId={job.id}
                  project={project}
                  style={{ '--project-index': index } as CSSProperties}
                />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  )
}
