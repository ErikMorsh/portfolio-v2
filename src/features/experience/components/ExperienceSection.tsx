'use client'

import { Box, Typography } from '@mui/material'
import { pickLocale } from '@/cv-data'
import { Reveal, RevealGroup, RevealItem } from '@/shared/motion'
import { useAppTheme } from '@/theme'
import { experienceCopy, experienceShowcase } from '../data/experience'
import { ExperienceCard } from './ExperienceCard'
import '../styles/experience.scss'

export function ExperienceSection() {
  const { locale } = useAppTheme()

  return (
    <Box className="experience" component="section" id="experience">
      <Box className="experience__shell">
        <Reveal className="experience__header">
          <Typography className="experience__eyebrow" component="p">
            {pickLocale(experienceCopy.eyebrow, locale)}
          </Typography>
          <Typography className="experience__title" component="h2">
            {pickLocale(experienceCopy.title, locale)}
          </Typography>
          <Typography className="experience__subtitle" component="p">
            {pickLocale(experienceCopy.subtitle, locale)}
          </Typography>
        </Reveal>

        <RevealGroup className="experience__timeline" as="ul" stagger={0.1}>
          {experienceShowcase.map((item) => (
            <RevealItem key={item.id} as="li">
              <ExperienceCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Box>
    </Box>
  )
}
