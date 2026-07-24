'use client'

import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import { Box, Typography } from '@mui/material'
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
    <div className="hero-portrait" aria-hidden={false}>
      {projectsStat ? (
        <aside className="hero-portrait__badge hero-portrait__badge--top">
          <RocketLaunchRoundedIcon className="hero-portrait__badge-icon" fontSize="small" />
          <Box className="hero-portrait__badge-copy">
            <Typography className="hero-portrait__badge-value" component="p">
              {formatStatValue(projectsStat.value)}
            </Typography>
            <Typography className="hero-portrait__badge-label" component="p">
              {pickLocale(projectsStat.label, locale)}
            </Typography>
          </Box>
        </aside>
      ) : null}
      <Box className="hero-portrait__ring">
        <img
          className="hero-portrait__image"
          src={assetSrc(personal.profilePhoto.src)}
          alt={pickLocale(personal.profilePhoto.alt, locale)}
        />
      </Box>
      {yearsStat ? (
        <aside className="hero-portrait__badge hero-portrait__badge--bottom">
          <EmojiEventsRoundedIcon className="hero-portrait__badge-icon" fontSize="small" />
          <Box className="hero-portrait__badge-copy">
            <Typography className="hero-portrait__badge-value" component="p">
              {formatStatValue(yearsStat.value)}
            </Typography>
            <Typography className="hero-portrait__badge-label" component="p">
              {pickLocale(yearsStat.label, locale)}
            </Typography>
          </Box>
        </aside>
      ) : null}
    </div>
  )
}
