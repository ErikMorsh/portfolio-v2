'use client'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Box, Button, IconButton } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroCopy, heroNavItems } from '../data/hero'
import { useHeroSectionProgress } from '../hooks/useActiveHeroSection'
import '../styles/hero.scss'

const RESUME_CTA_ID = 'hero-resume-cta'

export function HeroNav() {
  const { t } = useTranslation()
  const { locale, mode, toggleLocale, toggleMode } = useAppTheme()
  const { activeId } = useHeroSectionProgress()
  const [scrolled, setScrolled] = useState(false)
  const [resumeOutOfView, setResumeOutOfView] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobileNav, setIsMobileNav] = useState(false)
  const menuId = useId()
  const navRef = useRef<HTMLElement | null>(null)

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

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)')
    const onChange = () => {
      setIsMobileNav(media.matches)
      if (!media.matches) setMenuOpen(false)
    }

    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (target && navRef.current && !navRef.current.contains(target)) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const showMobilePanel = menuOpen && isMobileNav

  const dir = locale === 'fa' ? 'rtl' : 'ltr'

  return (
    <Box
      className={[
        'hero-nav-dock',
        scrolled || menuOpen ? 'hero-nav-dock--scrolled' : '',
        menuOpen ? 'hero-nav-dock--menu-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      component="header"
      dir={dir}
    >
      <Box
        className={[
          'hero-nav',
          resumeOutOfView ? 'hero-nav--with-resume' : '',
          menuOpen ? 'hero-nav--menu-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        component="nav"
        aria-label={t('hero.nav.label')}
        ref={navRef}
        dir={dir}
      >
        <Box className="hero-nav__leading">
          <IconButton
            className="hero-nav__menu-btn"
            size="small"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t('hero.nav.closeMenu') : t('hero.nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-hidden={!isMobileNav}
            tabIndex={isMobileNav ? 0 : -1}
          >
            {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
          </IconButton>

          <AnimatePresence initial={false}>
            {resumeOutOfView ? (
              <motion.div
                key="nav-resume"
                className="hero-nav__resume-wrap"
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
        </Box>

        <Box className="hero-nav__links hero-nav__links--desktop" component="ul">
          {heroNavItems.map((item) => {
            const active = item.id === activeId

            return (
              <Box key={item.id} component="li">
                <a
                  className={[
                    'hero-nav__link',
                    active ? 'hero-nav__link--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  href={item.href}
                  aria-current={active ? 'true' : undefined}
                >
                  {t(item.labelKey)}
                </a>
              </Box>
            )
          })}
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

        {showMobilePanel ? (
          <div id={menuId} className="hero-nav__panel">
            <Box className="hero-nav__links hero-nav__links--mobile" component="ul">
              {heroNavItems.map((item) => {
                const active = item.id === activeId

                return (
                  <Box key={item.id} component="li">
                    <a
                      className={[
                        'hero-nav__link',
                        'hero-nav__link--mobile',
                        active ? 'hero-nav__link--active' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      href={item.href}
                      aria-current={active ? 'true' : undefined}
                      onClick={closeMenu}
                    >
                      {t(item.labelKey)}
                    </a>
                  </Box>
                )
              })}
            </Box>
          </div>
        ) : null}
      </Box>
    </Box>
  )
}
