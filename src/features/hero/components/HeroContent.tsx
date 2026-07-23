'use client'

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Button, Typography } from '@mui/material'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroCopy } from '../data/hero'
import { HeroStats } from './HeroStats'
import { HeroTagline } from './HeroTagline'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

const ease = [0.22, 1, 0.36, 1] as const

export function HeroContent() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()

  return (
    <motion.div
      className="hero-content"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08, delayChildren: 0.06 },
        },
      }}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="hero-content__availability"
        role="status"
        variants={fadeUp}
        transition={{ duration: 0.45, ease }}
      >
        <span className="hero-content__availability-dot" aria-hidden />
        <span>{pickLocale(heroCopy.availability, locale)}</span>
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }}>
        <Typography className="hero-content__title" component="h1" variant="inherit">
          <span className="hero-content__first-name">
            {pickLocale(heroCopy.firstName, locale)}
          </span>
          <span className="hero-content__last-name">
            {pickLocale(heroCopy.lastName, locale)}
          </span>
        </Typography>
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.45, ease }}>
        <HeroTagline />
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.45, ease }}>
        <Typography className="hero-content__description" component="p">
          {pickLocale(heroCopy.description, locale)}
        </Typography>
      </motion.div>

      <motion.div
        className="hero-content__actions"
        variants={fadeUp}
        transition={{ duration: 0.45, ease }}
      >
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
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }}>
        <HeroStats />
      </motion.div>
    </motion.div>
  )
}
