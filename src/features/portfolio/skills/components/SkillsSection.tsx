'use client'

import { Box, Typography } from '@mui/material'
import { pickLocale } from '@/cv-data'
import { Reveal, RevealGroup, RevealItem } from '@/shared/motion'
import { useAppTheme } from '@/theme'
import { skillsCopy, skillsShowcase } from '../data/skills'
import { SkillsCard } from './SkillsCard'
import '../styles/skills.scss'

export function SkillsSection() {
  const { locale } = useAppTheme()

  return (
    <Box className="skills" component="section" id="skills">
      <Box className="skills__shell">
        <Reveal className="skills__header">
          <Typography className="skills__eyebrow" component="p">
            {pickLocale(skillsCopy.eyebrow, locale)}
          </Typography>
          <Typography className="skills__title" component="h2">
            {pickLocale(skillsCopy.title, locale)}
          </Typography>
          <Typography className="skills__subtitle" component="p">
            {pickLocale(skillsCopy.subtitle, locale)}
          </Typography>
        </Reveal>

        <RevealGroup className="skills__grid" as="ul" stagger={0.06}>
          {skillsShowcase.map((item) => (
            <RevealItem key={item.id} as="li">
              <SkillsCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Box>
    </Box>
  )
}
