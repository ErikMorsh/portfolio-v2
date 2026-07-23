import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded'
import { Box, Button, IconButton, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { contactCopy, contactLinks } from '../data/contact'

type InfoCardProps = {
  icon: ReactNode
  label: string
  value: string
  hint?: string
  href?: string
  action?: ReactNode
}

function InfoCard({ icon, label, value, hint, href, action }: InfoCardProps) {
  const valueNode = href ? (
    <a className="contact-info__value-link" href={href}>
      {value}
    </a>
  ) : (
    value
  )

  return (
    <Box className="contact-info__card">
      <span className="contact-info__icon" aria-hidden>
        {icon}
      </span>
      <Box className="contact-info__copy">
        <Typography className="contact-info__label" component="p">
          {label}
        </Typography>
        <Typography className="contact-info__value" component="p">
          {valueNode}
        </Typography>
        {hint ? (
          <Typography className="contact-info__hint" component="p">
            {hint}
          </Typography>
        ) : null}
      </Box>
      {action}
    </Box>
  )
}

export function ContactInfo() {
  const { locale } = useAppTheme()
  const emailAddress = personal.email.href.replace(/^mailto:/, '')

  return (
    <Box className="contact-info">
      <InfoCard
        icon={<EmailRoundedIcon fontSize="inherit" />}
        label={pickLocale(contactCopy.info.email.label, locale)}
        value={emailAddress}
        hint={pickLocale(contactCopy.info.email.hint, locale)}
        href={personal.email.href}
      />
      <InfoCard
        icon={<LocationOnRoundedIcon fontSize="inherit" />}
        label={pickLocale(contactCopy.info.location.label, locale)}
        value={pickLocale(contactCopy.info.location.value, locale)}
        hint={pickLocale(contactCopy.info.location.hint, locale)}
      />
      <InfoCard
        icon={<AccessTimeRoundedIcon fontSize="inherit" />}
        label={pickLocale(contactCopy.info.response.label, locale)}
        value={pickLocale(contactCopy.info.response.value, locale)}
        hint={pickLocale(contactCopy.info.response.hint, locale)}
      />
      <InfoCard
        icon={<PhoneInTalkRoundedIcon fontSize="inherit" />}
        label={pickLocale(contactCopy.info.schedule.label, locale)}
        value={pickLocale(contactCopy.info.schedule.value, locale)}
        action={
          <Button
            className="contact-info__schedule"
            component="a"
            href={contactLinks.phoneHref}
            variant="contained"
            size="small"
          >
            {pickLocale(contactCopy.info.schedule.action, locale)}
          </Button>
        }
      />

      <Box className="contact-info__services">
        <Typography className="contact-info__services-title" component="p">
          {pickLocale(contactCopy.services.title, locale)}
        </Typography>
        <Box className="contact-info__services-list" component="ul">
          {contactCopy.services.items.map((item) => (
            <Box
              key={pickLocale(item, locale)}
              className="contact-info__service"
              component="li"
            >
              <CheckRoundedIcon
                className="contact-info__check"
                fontSize="inherit"
              />
              <span>{pickLocale(item, locale)}</span>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="contact-info__social">
        <IconButton
          className="contact-info__social-btn"
          component="a"
          href={contactLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={pickLocale(contactCopy.social.github, locale)}
        >
          <GitHubIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          className="contact-info__social-btn"
          component="a"
          href={personal.linkedin.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={pickLocale(contactCopy.social.linkedin, locale)}
        >
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          className="contact-info__social-btn"
          component="a"
          href={personal.email.href}
          aria-label={pickLocale(contactCopy.social.email, locale)}
        >
          <EmailRoundedIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  )
}
