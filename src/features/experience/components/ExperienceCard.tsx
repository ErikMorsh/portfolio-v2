import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { pickLocale } from '@/cv-data'
import { getJobById, jobPaths } from '@/features/job'
import { useAppTheme } from '@/theme'
import { experienceCopy, type ExperienceShowcaseItem } from '../data/experience'

type ExperienceCardProps = {
  item: ExperienceShowcaseItem
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  const { locale } = useAppTheme()
  const job = getJobById(item.id)
  if (!job) return null

  const role = pickLocale(job.role, locale)
  const company = pickLocale(job.title, locale)
  const detailHref = jobPaths.detail(job.id)

  return (
    <Box className="experience-card" component="li">
      <span className="experience-card__dot" aria-hidden />

      <Box className="experience-card__panel">
        <Box className="experience-card__header">
          <Typography className="experience-card__role" component="h3">
            {role}
          </Typography>
          <Box className="experience-card__meta-right">
            <Typography className="experience-card__period" component="p">
              {pickLocale(item.period, locale)}
            </Typography>
            {item.current ? (
              <span className="experience-card__current">
                <span className="experience-card__current-dot" aria-hidden />
                {pickLocale(experienceCopy.current, locale)}
              </span>
            ) : null}
          </Box>
        </Box>

        <Box className="experience-card__company-row">
          <Typography
            className="experience-card__company"
            component={RouterLink}
            to={detailHref}
          >
            {company}
          </Typography>
          <Typography className="experience-card__location" component="p">
            <LocationOnRoundedIcon
              className="experience-card__location-icon"
              fontSize="inherit"
            />
            <span>{pickLocale(item.location, locale)}</span>
          </Typography>
          <span className="experience-card__mode">
            {pickLocale(experienceCopy.mode[item.mode], locale)}
          </span>
        </Box>

        <Typography className="experience-card__description" component="p">
          {pickLocale(item.description, locale)}
        </Typography>

        <Box className="experience-card__tech" component="ul">
          {job.techStack.slice(0, 4).map((tech) => (
            <Box key={tech} className="experience-card__tech-item" component="li">
              {tech}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
