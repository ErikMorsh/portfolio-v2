import { Box, Chip, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'
import { assetSrc, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { jobPaths, type Job } from '../lib/jobs'

type JobCardProps = {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const params = useParams<{ jobId?: string; projectId?: string }>()
  const jobId = typeof params.jobId === 'string' ? params.jobId : undefined
  const projectId = typeof params.projectId === 'string' ? params.projectId : undefined
  const { locale } = useAppTheme()
  const isSelected = jobId === job.id
  const isDetailMode = Boolean(jobId) && !projectId
  const displayName = pickLocale(isDetailMode ? job.title : job.company, locale)

  const openDetail = () => {
    router.push(jobPaths.detail(job.id))
  }

  return (
    <Paper
      className={['job-card', isSelected && 'job-card--selected'].filter(Boolean).join(' ')}
      elevation={0}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${t('job.viewDetails')}: ${displayName}`}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openDetail()
        }
      }}
    >
      <Box className="job-card__header">
        <Box className="job-card__logo-wrap">
          <img
            className="job-card__logo"
            src={assetSrc(job.logo.src)}
            alt={pickLocale(job.logo.alt, locale)}
          />
        </Box>

        <Box className="job-card__meta">
          <Typography className="job-card__company" component="h3" variant="subtitle2">
            {displayName}
          </Typography>

          <Typography className="job-card__role" color="primary" variant="body2">
            {pickLocale(job.role, locale)}
          </Typography>

          <Typography className="job-card__duration" color="text.secondary" variant="caption">
            {pickLocale(job.duration, locale)}
          </Typography>
        </Box>
      </Box>

      {!isDetailMode && (
        <Box className="job-card__tags">
          {job.techStack.map((tech) => (
            <Chip key={tech} className="job-card__tag" label={tech} size="small" variant="outlined" />
          ))}
        </Box>
      )}
    </Paper>
  )
}
