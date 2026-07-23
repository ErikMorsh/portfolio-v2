import { Box, Typography } from '@mui/material'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { contactCopy } from '../data/contact'
import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'
import '../styles/contact.scss'

export function ContactSection() {
  const { locale } = useAppTheme()

  return (
    <Box className="contact" component="section" id="contact">
      <Box className="contact__shell">
        <Box className="contact__header">
          <Typography className="contact__eyebrow" component="p">
            {pickLocale(contactCopy.eyebrow, locale)}
          </Typography>
          <Typography className="contact__title" component="h2">
            <span>{pickLocale(contactCopy.title.before, locale)} </span>
            <span className="contact__title-accent">
              {pickLocale(contactCopy.title.accent, locale)}
            </span>
          </Typography>
          <Typography className="contact__subtitle" component="p">
            {pickLocale(contactCopy.subtitle, locale)}
          </Typography>
        </Box>

        <Box className="contact__stage">
          <ContactInfo />
          <ContactForm />
        </Box>
      </Box>
    </Box>
  )
}
