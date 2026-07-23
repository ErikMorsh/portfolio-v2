'use client'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { motion } from 'motion/react'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroCopy } from '../data/hero'

export function HeroScrollHint() {
  const { locale } = useAppTheme()

  return (
    <motion.a
      className="hero-scroll-hint"
      href="#about"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 0.4, y: 0 }}
      whileHover={{ opacity: 0.85 }}
      whileFocus={{ opacity: 0.85 }}
      transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
      aria-label={pickLocale(heroCopy.scrollExplore, locale)}
    >
      <span className="hero-scroll-hint__label">
        {pickLocale(heroCopy.scrollExplore, locale)}
      </span>
      <KeyboardArrowDownRoundedIcon
        className="hero-scroll-hint__arrow"
        aria-hidden
      />
    </motion.a>
  )
}
