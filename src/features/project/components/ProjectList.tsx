import { Box } from '@mui/material'
import '../styles/project.scss'
import { getAllProjects } from '../lib/projects'
import { ProjectCard } from './ProjectCard'

type ProjectListProps = {
  className?: string
}

export function ProjectList({ className }: ProjectListProps) {
  const projects = getAllProjects()
  const classes = ['project-list', className].filter(Boolean).join(' ')

  return (
    <Box className={classes}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Box>
  )
}
