'use client'

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroCopy } from '../data/hero'
import { HeroTagline } from './HeroTagline'

export function HeroContent() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()

  return (
    <div className="hero-content">
      <div className="hero-content__availability" role="status">
        <span className="hero-content__availability-dot" aria-hidden />
        <span>{pickLocale(heroCopy.availability, locale)}</span>
      </div>

      <Typography className="hero-content__title" component="h1" variant="inherit">
        <span className="hero-content__first-name">
          {pickLocale(heroCopy.firstName, locale)}
        </span>
        <span className="hero-content__last-name">
          {pickLocale(heroCopy.lastName, locale)}
        </span>
      </Typography>

      <div style={{ width: '80%' }}>
        <HeroTagline />
      </div>

      <Typography className="hero-content__description" component="p">
        {pickLocale(heroCopy.description, locale)}
      </Typography>

      <div className="hero-content__actions">
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
          id="hero-resume-cta"
          className="hero-content__cta-secondary"
          component={Link}
          href={personal.resume.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<OpenInNewRoundedIcon />}
          aria-label={t('hero.resumeAria')}
        >
          {pickLocale(heroCopy.resume, locale)}
        </Button>
      </div>
    </div>
  )
}
