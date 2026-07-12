import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { JobList } from '@/features/job'
import { ProjectList } from '@/features/project'
import { SkillList } from '@/features/skill'

export function WelcomeMain() {
  const { t } = useTranslation()

  return (
    <Box className="welcome__main" component="section">
      <Paper
        className="welcome__section welcome__section--jobs"
        elevation={0}
        component="section"
        aria-label={t('welcome.sections.experience')}
      >
        <Typography className="welcome__section-title" component="h2" variant="h6">
          {t('welcome.sections.experience')}
        </Typography>

        <JobList />
      </Paper>

      <Paper
        className="welcome__section welcome__section--projects"
        elevation={0}
        component="section"
        aria-label={t('welcome.sections.projects')}
      >
        <Typography className="welcome__section-title" component="h2" variant="h6">
          {t('welcome.sections.projects')}
        </Typography>

        <ProjectList />
      </Paper>

      <Paper
        className="welcome__section welcome__section--skills"
        elevation={0}
        component="section"
        aria-label={t('welcome.sections.skills')}
      >
        <Typography className="welcome__section-title" component="h2" variant="h6">
          {t('welcome.sections.skills')}
        </Typography>

        <SkillList />
      </Paper>
    </Box>
  )
}
