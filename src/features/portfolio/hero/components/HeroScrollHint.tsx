'use client'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroCopy } from '../data/hero'

export function HeroScrollHint() {
  const { locale } = useAppTheme()

  return (
    <a
      className="hero-scroll-hint"
      href="#about"
      aria-label={pickLocale(heroCopy.scrollExplore, locale)}
    >
      <span className="hero-scroll-hint__label">
        {pickLocale(heroCopy.scrollExplore, locale)}
      </span>
      <KeyboardArrowDownRoundedIcon
        className="hero-scroll-hint__arrow"
        aria-hidden
      />
    </a>
  )
}
