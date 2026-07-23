import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Box, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import { pickLocale } from '@/cv-data'
import { getJobForProject } from '@/features/job'
import { getProjectById, projectPaths } from '@/features/project'
import { useAppTheme } from '@/theme'
import { projectsCopy, type ProjectsShowcaseItem } from '../data/projects'
import { projectIconMap } from '../lib/icons'

type ProjectsCardProps = {
  item: ProjectsShowcaseItem
}

export function ProjectsCard({ item }: ProjectsCardProps) {
  const { locale } = useAppTheme()
  const project = getProjectById(item.id)
  const job = getJobForProject(item.id)
  const title = project ? pickLocale(project.title, locale) : item.id
  const detailHref =
    job != null ? projectPaths.detail(job.id, item.id) : undefined
  const Icon = projectIconMap[item.icon]

  return (
    <Box
      className={[
        'projects-card',
        item.featured ? 'projects-card--featured' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      component="li"
    >
      <Box className="projects-card__top">
        <span className="projects-card__icon" aria-hidden>
          <Icon fontSize="inherit" />
        </span>
        {item.featured ? (
          <span className="projects-card__badge">
            {pickLocale(projectsCopy.featured, locale)}
          </span>
        ) : null}
      </Box>

      <Typography className="projects-card__title" component="h3">
        {title}
      </Typography>
      <Typography className="projects-card__description" component="p">
        {pickLocale(item.description, locale)}
      </Typography>

      <Box className="projects-card__footer">
        <Box className="projects-card__tech" component="ul">
          {item.tech.map((tech) => (
            <Box key={tech} className="projects-card__tech-item" component="li">
              {tech}
            </Box>
          ))}
        </Box>

        <Box className="projects-card__actions">
          {item.githubUrl ? (
            <IconButton
              className="projects-card__action"
              component="a"
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              aria-label={pickLocale(projectsCopy.github, locale)}
            >
              <GitHubIcon fontSize="inherit" />
            </IconButton>
          ) : null}
          {detailHref ? (
            <IconButton
              className="projects-card__action"
              component={Link}
              href={detailHref}
              size="small"
              aria-label={`${pickLocale(projectsCopy.viewDetails, locale)}: ${title}`}
            >
              <OpenInNewRoundedIcon fontSize="inherit" />
            </IconButton>
          ) : item.liveUrl ? (
            <IconButton
              className="projects-card__action"
              component="a"
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              aria-label={`${pickLocale(projectsCopy.viewDetails, locale)}: ${title}`}
            >
              <OpenInNewRoundedIcon fontSize="inherit" />
            </IconButton>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}
