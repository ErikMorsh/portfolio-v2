import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroCopy } from '../data/hero'
import { HeroStats } from './HeroStats'

export function HeroContent() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()

  return (
    <Box className="hero-content">
      <Box className="hero-content__availability" role="status">
        <span className="hero-content__availability-dot" aria-hidden />
        <span>{pickLocale(heroCopy.availability, locale)}</span>
      </Box>

      <Typography className="hero-content__title" component="h1" variant="inherit">
        <span className="hero-content__first-name">
          {pickLocale(heroCopy.firstName, locale)}
        </span>
        <span className="hero-content__last-name">
          {pickLocale(heroCopy.lastName, locale)}
        </span>
      </Typography>

      <Typography className="hero-content__tagline" component="p">
        {pickLocale(heroCopy.tagline, locale)}
      </Typography>

      <Typography className="hero-content__description" component="p">
        {pickLocale(heroCopy.description, locale)}
      </Typography>

      <Box className="hero-content__actions">
        <Button
          className="hero-content__cta-primary"
          component="a"
          href="#projects"
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
        >
          {pickLocale(heroCopy.viewProjects, locale)}
        </Button>
        <Button
          className="hero-content__cta-secondary"
          component="a"
          href={personal.linkedin.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<OpenInNewRoundedIcon />}
          aria-label={t('hero.resumeAria')}
        >
          {pickLocale(heroCopy.resume, locale)}
        </Button>
      </Box>

      <HeroStats />
    </Box>
  )
}
