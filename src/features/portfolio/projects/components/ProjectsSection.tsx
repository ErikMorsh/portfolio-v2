'use client'

import { Box, Typography } from '@mui/material'
import { pickLocale } from '@/cv-data'
import { Reveal, RevealGroup, RevealItem } from '@/shared/motion'
import { useAppTheme } from '@/theme'
import { projectsCopy, projectsShowcase } from '../data/projects'
import { ProjectsCard } from './ProjectsCard'
import '../styles/projects.scss'

export function ProjectsSection() {
  const { locale } = useAppTheme()

  return (
    <Box className="projects" component="section" id="projects">
      <Box className="projects__shell">
        <Reveal className="projects__header">
          <Typography className="projects__eyebrow" component="p">
            {pickLocale(projectsCopy.eyebrow, locale)}
          </Typography>
          <Typography className="projects__title" component="h2">
            {pickLocale(projectsCopy.title, locale)}
          </Typography>
          <Typography className="projects__subtitle" component="p">
            {pickLocale(projectsCopy.subtitle, locale)}
          </Typography>
        </Reveal>

        <RevealGroup className="projects__grid" as="ul" stagger={0.07}>
          {projectsShowcase.map((item) => (
            <RevealItem key={item.id} as="li">
              <ProjectsCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Box>
    </Box>
  )
}
