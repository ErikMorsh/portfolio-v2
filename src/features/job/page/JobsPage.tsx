import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Link as MuiLink, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Page } from '@/shared/layout'
import { JobList } from '../components'
import '../styles/job.scss'

export function JobsPage() {
  const { t } = useTranslation()

  return (
    <Page className="job-page">
      <MuiLink
        className="job-page__back"
        component={Link}
        href="/"
        underline="hover"
        variant="body2"
      >
        <ArrowBackIcon className="job-page__back-icon" fontSize="inherit" />
        {t('job.backToHome')}
      </MuiLink>

      <Typography className="job-page__title" component="h1" variant="h4">
        {t('job.listTitle')}
      </Typography>

      <Typography className="job-page__subtitle" color="text.secondary" variant="body1">
        {t('job.listSubtitle')}
      </Typography>

      <Box className="job-page__list">
        <JobList />
      </Box>
    </Page>
  )
}
