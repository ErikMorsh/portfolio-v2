import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import { Box, Link, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { abilities, personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { AbilityGroupSection } from './AbilityGroupSection'

export function WelcomeSidebar() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()

  return (
    <Paper className="welcome__sidebar" elevation={0} component="aside">
      <Box className="welcome__sidebar-inner welcome__sidebar-panel-inner">
        <Box className="welcome__sidebar-section">
          <Typography className="welcome__sidebar-title" component="h2" variant="subtitle1">
            {t('welcome.sidebar.abilities')}
          </Typography>

          <Box className="welcome__abilities">
            {abilities.map((group) => (
              <AbilityGroupSection key={group.id} group={group} />
            ))}
          </Box>
        </Box>

        <Box className="welcome__sidebar-section">
          <Typography className="welcome__sidebar-title" component="h2" variant="subtitle1">
            {t('welcome.sidebar.contact')}
          </Typography>

          <Box className="welcome__contact-list">
            <Box className="welcome__contact-item">
              <EmailOutlinedIcon className="welcome__contact-icon" fontSize="small" />
              <Link
                className="welcome__contact-ltr"
                component="a"
                href={personal.email.href}
                underline="hover"
              >
                {personal.email.label}
              </Link>
            </Box>

            <Box className="welcome__contact-item">
              <PhoneOutlinedIcon className="welcome__contact-icon" fontSize="small" />
              <Link
                className="welcome__contact-ltr"
                href={`tel:${personal.phone.replace(/\s/g, '')}`}
                underline="hover"
              >
                {personal.phone}
              </Link>
            </Box>

            <Box className="welcome__contact-item">
              <LinkedInIcon className="welcome__contact-icon" fontSize="small" />
              <Link
                className="welcome__contact-ltr"
                href={personal.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {personal.linkedin.username}
              </Link>
            </Box>

            <Box className="welcome__contact-item">
              <LocationOnOutlinedIcon className="welcome__contact-icon" fontSize="small" />
              <Typography variant="body2">
                {pickLocale(personal.location, locale)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
