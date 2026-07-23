import { Box, Typography } from '@mui/material'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { skillsCopy, skillsShowcase } from '../data/skills'
import { SkillsCard } from './SkillsCard'
import '../styles/skills.scss'

export function SkillsSection() {
  const { locale } = useAppTheme()

  return (
    <Box className="skills" component="section" id="skills">
      <Box className="skills__shell">
        <Box className="skills__header">
          <Typography className="skills__eyebrow" component="p">
            {pickLocale(skillsCopy.eyebrow, locale)}
          </Typography>
          <Typography className="skills__title" component="h2">
            {pickLocale(skillsCopy.title, locale)}
          </Typography>
          <Typography className="skills__subtitle" component="p">
            {pickLocale(skillsCopy.subtitle, locale)}
          </Typography>
        </Box>

        <Box className="skills__grid" component="ul">
          {skillsShowcase.map((item) => (
            <SkillsCard key={item.id} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
