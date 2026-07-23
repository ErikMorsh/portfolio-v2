import { Box, Chip, Paper, Typography } from '@mui/material'
import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'
import { assetSrc, pickLocale } from '@/cv-data'
import { getJobForProject } from '@/features/portfolio/job'
import { useAppTheme } from '@/theme'
import { projectPaths, type Project } from '../lib/projects'

type ProjectCardProps = {
  project: Project
  hideJobMeta?: boolean
  jobId?: string
  className?: string
  style?: CSSProperties
}

export function ProjectCard({
  project,
  hideJobMeta = false,
  jobId: jobIdProp,
  className,
  style,
}: ProjectCardProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const params = useParams<{ projectId?: string }>()
  const projectId = typeof params.projectId === 'string' ? params.projectId : undefined
  const { locale } = useAppTheme()
  const isSelected = projectId === project.id
  const isDetailMode = Boolean(projectId)
  const title = pickLocale(project.title, locale)
  const parentJob = getJobForProject(project.id)
  const targetJobId = jobIdProp ?? parentJob?.id

  const openDetail = () => {
    if (!targetJobId) return
    router.push(projectPaths.detail(targetJobId, project.id))
  }

  return (
    <Paper
      className={[
        'project-card',
        isSelected && 'project-card--selected',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      elevation={0}
      style={style}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${t('project.viewDetails')}: ${title}`}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openDetail()
        }
      }}
    >
      <Box className="project-card__meta">
        <Box className="project-card__header">
          <Typography className="project-card__title" component="h3" variant="subtitle2">
            {title}
          </Typography>

          {parentJob && !hideJobMeta && (
            <Box className="project-card__job">
              <Box className="project-card__job-logo-wrap">
                <img
                  className="project-card__job-logo"
                  src={assetSrc(parentJob.logo.src)}
                  alt={pickLocale(parentJob.logo.alt, locale)}
                />
              </Box>
              {!isDetailMode && (
                <Typography className="project-card__job-name" color="text.secondary" variant="caption">
                  {pickLocale(parentJob.title, locale)}
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {!isDetailMode && (
          <Typography className="project-card__subtitle" color="primary" variant="body2">
            {pickLocale(project.subtitle, locale)}
          </Typography>
        )}

        {!isDetailMode && (
          <Typography className="project-card__goals" color="text.secondary" variant="body2">
            {pickLocale(project.goals, locale)}
          </Typography>
        )}
      </Box>

      {!isDetailMode && (
        <Box className="project-card__tags">
          {project.techStack.map((tech) => (
            <Chip key={tech} className="project-card__tag" label={tech} size="small" variant="outlined" />
          ))}
        </Box>
      )}
    </Paper>
  )
}
