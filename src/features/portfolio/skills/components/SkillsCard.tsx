import { Box, Typography } from '@mui/material'
import { pickLocale } from '@/cv-data'
import { SkillIcons } from '@/features/portfolio/skill'
import { useAppTheme } from '@/theme'
import type { SkillsShowcaseItem } from '../data/skills'

type SkillsCardProps = {
  item: SkillsShowcaseItem
}

export function SkillsCard({ item }: SkillsCardProps) {
  const { locale } = useAppTheme()
  const name = pickLocale(item.name, locale)

  return (
    <Box className="skills-card">
      <SkillIcons
        className="skills-card__icon"
        icons={[item.icon]}
        label={name}
        accentColor="currentColor"
      />
      <Box className="skills-card__meta">
        <Typography className="skills-card__name" component="h3">
          {name}
        </Typography>
        <Typography className="skills-card__level" component="p">
          {item.level}%
        </Typography>
      </Box>
      <Box
        className="skills-card__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={item.level}
        aria-label={name}
      >
        <span
          className="skills-card__fill"
          style={{ width: `${item.level}%` }}
        />
      </Box>
    </Box>
  )
}
