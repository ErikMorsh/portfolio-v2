import { Box, LinearProgress, Typography } from '@mui/material'
import type { AbilityItem } from '@/cv-data'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'

type AbilityProgressProps = {
  ability: AbilityItem
}

export function AbilityProgress({ ability }: AbilityProgressProps) {
  const { locale } = useAppTheme()
  const label = pickLocale(ability.label, locale)

  return (
    <Box className="ability-progress">
      <Box className="ability-progress__header">
        <Typography className="ability-progress__label" component="span" variant="body2">
          {label}
        </Typography>
        <Typography
          className="ability-progress__value"
          component="span"
          variant="caption"
          color="text.secondary"
        >
          {ability.level}%
        </Typography>
      </Box>
      <LinearProgress
        className="ability-progress__bar"
        variant="determinate"
        value={ability.level}
        aria-label={label}
      />
    </Box>
  )
}
