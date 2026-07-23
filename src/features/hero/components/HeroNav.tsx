'use client'

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Box, Button, IconButton } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
        className={['hero-nav', resumeOutOfView ? 'hero-nav--with-resume' : '']
          .filter(Boolean)
          .join(' ')}
        component="nav"
        aria-label={t('hero.nav.label')}
      >
        <AnimatePresence initial={false}>
          {resumeOutOfView ? (
            <motion.div
              key="nav-resume"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                className="hero-nav__resume"
                component={Link}
                href={personal.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                startIcon={<OpenInNewRoundedIcon />}
                aria-label={t('hero.resumeAria')}
              >
                {pickLocale(heroCopy.resume, locale)}
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>

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
