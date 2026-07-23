import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { pickLocale } from '@/cv-data'
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

export function HeroStats() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()

  return (
    <Box className="hero-stats" component="ul" aria-label={t('hero.statsLabel')}>
      {heroStats.map((stat) => (
        <Box key={stat.id} className="hero-stats__item" component="li">
          <Typography className="hero-stats__value" component="p">
            {formatStatValue(stat.value)}
          </Typography>
          <Typography className="hero-stats__label" component="p">
            {pickLocale(stat.label, locale)}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
