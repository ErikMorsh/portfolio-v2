import { Box, Paper, Typography } from '@mui/material'
import '../styles/skill.scss'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import { pickLocale, pickLocaleList } from '@/cv-data'
import { Main2Toolbar } from '@/features/welcome/components'
import { useAppTheme } from '@/theme'
import { getSkillById } from '../lib/skills'
import { SkillIcons } from './SkillIcons'

export function SkillDetailContent() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()
  const { skillId } = useParams<{ skillId: string }>()

  if (!skillId) {
    return <Navigate to="/" replace />
  }

  const skill = getSkillById(skillId)

  if (!skill) {
    return <Navigate to="/" replace />
  }

  const skillTitle = pickLocale(skill.title, locale)
  const highlights = pickLocaleList(skill.highlights, locale)

  return (
    <Box className="welcome__main2-content">
      <Main2Toolbar
        backTo="/"
        items={[
          { label: t('nav.home'), to: '/' },
          { label: skillTitle },
        ]}
      />

      <Paper
        className="skill-detail"
        elevation={0}
        style={{ '--skill-glow': skill.glowColor } as React.CSSProperties}
      >
        <Box className="skill-detail__header">
          <SkillIcons
            brandColors
            accentColor={skill.glowColor}
            className="skill-detail__icons"
            icons={skill.icons}
            label={skillTitle}
          />

          <Box className="skill-detail__header-content">
            <Typography className="skill-detail__title" component="h1" variant="h6">
              {skillTitle}
            </Typography>
          </Box>
        </Box>

        <Box className="skill-detail__highlights" component="ul">
          {highlights.map((highlight) => (
            <Typography
              key={highlight}
              className="skill-detail__highlight"
              component="li"
              variant="body2"
              color="text.secondary"
            >
              {highlight}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}
