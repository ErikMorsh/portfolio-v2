import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Box, Button, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroCopy, heroNavItems } from '../data/hero'
import '../styles/hero.scss'

const RESUME_CTA_ID = 'hero-resume-cta'

export function HeroNav() {
  const { t } = useTranslation()
  const { locale, mode, toggleLocale, toggleMode } = useAppTheme()
  const [scrolled, setScrolled] = useState(false)
  const [resumeOutOfView, setResumeOutOfView] = useState(false)

  useEffect(() => {
    const syncScrolled = () => {
      setScrolled(window.scrollY > 10)
    }

    syncScrolled()
    window.addEventListener('scroll', syncScrolled, { passive: true })
    return () => window.removeEventListener('scroll', syncScrolled)
  }, [])

  useEffect(() => {
    const resumeCta = document.getElementById(RESUME_CTA_ID)
    if (!resumeCta) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setResumeOutOfView(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' },
    )

    observer.observe(resumeCta)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      className={['hero-nav-dock', scrolled ? 'hero-nav-dock--scrolled' : '']
        .filter(Boolean)
        .join(' ')}
      component="header"
    >
      <Box
        className={[
          'hero-nav hero-nav--with-resume',
        ]
          .filter(Boolean)
          .join(' ')}
        component="nav"
        aria-label={t('hero.nav.label')}
      >
        <Button
          className="hero-nav__resume"
          component={RouterLink}
          to={personal.resume.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          startIcon={<OpenInNewRoundedIcon />}
          aria-label={t('hero.resumeAria')}
          sx={{
            opacity: resumeOutOfView ? "1 !important" : "0 !important",
          }}
          disabled={!resumeOutOfView}
        >
          {pickLocale(heroCopy.resume, locale)}
        </Button>

        <Box className="hero-nav__links" component="ul">
          {heroNavItems.map((item) => (
            <Box key={item.id} component="li">
              <a
                className={[
                  'hero-nav__link',
                  item.id === 'home' ? 'hero-nav__link--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                href={item.href}
              >
                {t(item.labelKey)}
              </a>
            </Box>
          ))}
        </Box>

        <Box className="hero-nav__actions">
          <IconButton
            className="hero-nav__icon-btn"
            size="small"
            onClick={toggleMode}
            aria-label={t('theme.toggle')}
          >
            {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <IconButton
            className="hero-nav__icon-btn"
            size="small"
            onClick={toggleLocale}
            aria-label={t('language.toggle')}
          >
            <LanguageIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
