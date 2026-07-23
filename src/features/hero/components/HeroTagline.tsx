'use client'

import { Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { heroCopy } from '../data/hero'

export function HeroTagline() {
  const { locale } = useAppTheme()
  const [reducedMotion, setReducedMotion] = useState(false)

  const lines = useMemo(
    () => heroCopy.taglines.map((line) => pickLocale(line, locale)),
    [locale],
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const sequence = useMemo(() => {
    const steps: Array<string | number> = []
    for (const line of lines) {
      steps.push(line, 2200)
    }
    return steps
  }, [lines])

  return (
    <Typography
      className="hero-content__tagline"
      component="p"
      aria-label={lines.join(' · ')}
    >
      {reducedMotion ? (
        <span>{lines[0]}</span>
      ) : (
        <TypeAnimation
          key={locale}
          className="hero-content__tagline-typed"
          sequence={sequence}
          wrapper="span"
          speed={46}
          deletionSpeed={80}
          cursor={false}
          repeat={Infinity}
          aria-hidden
        />
      )}
    </Typography>
  )
}
