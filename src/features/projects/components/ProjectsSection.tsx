import { Box, Typography } from '@mui/material'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { projectsCopy, projectsShowcase } from '../data/projects'
import { ProjectsCard } from './ProjectsCard'
import '../styles/projects.scss'

export function ProjectsSection() {
  const { locale } = useAppTheme()

  return (
    <Box className="projects" component="section" id="projects">
      <Box className="projects__shell">
        <Box className="projects__header">
          <Typography className="projects__eyebrow" component="p">
            {pickLocale(projectsCopy.eyebrow, locale)}
          </Typography>
          <Typography className="projects__title" component="h2">
            {pickLocale(projectsCopy.title, locale)}
          </Typography>
          <Typography className="projects__subtitle" component="p">
            {pickLocale(projectsCopy.subtitle, locale)}
          </Typography>
        </Box>

        <Box className="projects__grid" component="ul">
          {projectsShowcase.map((item) => (
            <ProjectsCard key={item.id} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
