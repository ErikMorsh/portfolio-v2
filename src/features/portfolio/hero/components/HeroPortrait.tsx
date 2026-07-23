'use client'

import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import { Box, Typography } from '@mui/material'
import { motion } from 'motion/react'
import { assetSrc, personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroStats } from '../data/hero'

function formatStatValue(value: string) {
  if (value.endsWith('+')) {
    return (
      <>
        {value.slice(0, -1)}
        <span>+</span>
      </>
    )
  }

  return value
}

export function HeroPortrait() {
  const { locale } = useAppTheme()
  const yearsStat = heroStats.find((stat) => stat.id === 'years')
  const projectsStat = heroStats.find((stat) => stat.id === 'projects')

  return (
    <motion.div
      className="hero-portrait"
      aria-hidden={false}
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {projectsStat ? (
        <motion.aside
          className="hero-portrait__badge hero-portrait__badge--top"
          initial={{ opacity: 0, x: 16, y: -8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <RocketLaunchRoundedIcon className="hero-portrait__badge-icon" fontSize="small" />
          <Box className="hero-portrait__badge-copy">
            <Typography className="hero-portrait__badge-value" component="p">
              {formatStatValue(projectsStat.value)}
            </Typography>
            <Typography className="hero-portrait__badge-label" component="p">
              {pickLocale(projectsStat.label, locale)}
            </Typography>
          </Box>
        </motion.aside>
      ) : null}
      <Box className="hero-portrait__ring">
        <img
          className="hero-portrait__image"
          src={assetSrc(personal.profilePhoto.src)}
          alt={pickLocale(personal.profilePhoto.alt, locale)}
        />
      </Box>
      {yearsStat ? (
        <motion.aside
          className="hero-portrait__badge hero-portrait__badge--bottom"
          initial={{ opacity: 0, x: -16, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <EmojiEventsRoundedIcon className="hero-portrait__badge-icon" fontSize="small" />
          <Box className="hero-portrait__badge-copy">
            <Typography className="hero-portrait__badge-value" component="p">
              {formatStatValue(yearsStat.value)}
            </Typography>
            <Typography className="hero-portrait__badge-label" component="p">
              {pickLocale(yearsStat.label, locale)}
            </Typography>
          </Box>
        </motion.aside>
      ) : null}
    </motion.div>
  )
}
