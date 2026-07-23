import { Box, Typography } from '@mui/material'
import type { AbilityGroup } from '@/cv-data'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { AbilityProgress } from './AbilityProgress'

type AbilityGroupSectionProps = {
  group: AbilityGroup
}

export function AbilityGroupSection({ group }: AbilityGroupSectionProps) {
  const { locale } = useAppTheme()

  return (
    <Box className="welcome__ability-group">
      <Typography className="welcome__ability-group-title" component="h3" variant="body2">
        {pickLocale(group.title, locale)}
      </Typography>

      <Box className="welcome__ability-group-items">
        {group.items.map((ability) => (
          <AbilityProgress key={ability.id} ability={ability} />
        ))}
      </Box>
    </Box>
  )
}
