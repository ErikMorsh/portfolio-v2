import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { about, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { aboutCopy } from '../data/about'

export function AboutContent() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()
  const { before, accent, after } = aboutCopy.headline

  return (
    <Box className="about-content">
      <Typography className="about-content__eyebrow" component="p">
        {pickLocale(aboutCopy.eyebrow, locale)}
      </Typography>

      <Typography className="about-content__headline" component="h2">
        <span>{pickLocale(before, locale)} </span>
        <span className="about-content__headline-accent">
          {pickLocale(accent, locale)}
        </span>
        <span> {pickLocale(after, locale)}</span>
      </Typography>

      <Box className="about-content__body">
        {about.paragraphs.map((paragraph) => (
          <Typography
            key={pickLocale(paragraph, locale)}
            className="about-content__paragraph"
            component="p"
          >
            {pickLocale(paragraph, locale)}
          </Typography>
        ))}
      </Box>

      <Box
        className="about-content__skills"
        component="ul"
        aria-label={t('about.skillsLabel')}
      >
        {aboutCopy.skillPills.map((skill) => (
          <Box key={skill} className="about-content__skill" component="li">
            {skill}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
