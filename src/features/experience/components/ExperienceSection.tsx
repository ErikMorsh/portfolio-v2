import { Box, Typography } from '@mui/material'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { experienceCopy, experienceShowcase } from '../data/experience'
import { ExperienceCard } from './ExperienceCard'
import '../styles/experience.scss'

export function ExperienceSection() {
  const { locale } = useAppTheme()

  return (
    <Box className="experience" component="section" id="experience">
      <Box className="experience__shell">
        <Box className="experience__header">
          <Typography className="experience__eyebrow" component="p">
            {pickLocale(experienceCopy.eyebrow, locale)}
          </Typography>
          <Typography className="experience__title" component="h2">
            {pickLocale(experienceCopy.title, locale)}
          </Typography>
          <Typography className="experience__subtitle" component="p">
            {pickLocale(experienceCopy.subtitle, locale)}
          </Typography>
        </Box>

        <Box className="experience__timeline" component="ul">
          {experienceShowcase.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
