import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { Box, Typography } from '@mui/material'
import { assetSrc, personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { aboutCopy } from '../data/about'

export function AboutCard() {
  const { locale } = useAppTheme()

  return (
    <Box className="about-card">
      <Box className="about-card__portrait">
        <img
          className="about-card__image"
          src={assetSrc(personal.profilePhoto.src)}
          alt={pickLocale(personal.profilePhoto.alt, locale)}
        />
      </Box>

      <Typography className="about-card__name" component="h3">
        {pickLocale(personal.fullName, locale)}
      </Typography>
      <Typography className="about-card__role" component="p">
        {pickLocale(personal.title, locale)}
      </Typography>
      <Typography className="about-card__stack" component="p">
        {pickLocale(aboutCopy.stackSubtitle, locale)}
      </Typography>

      <Box className="about-card__meta">
        <Box className="about-card__pill" component="p">
          <LocationOnRoundedIcon className="about-card__pill-icon about-card__pill-icon--pin" />
          <span>{pickLocale(personal.location, locale)}</span>
        </Box>
        <Box className="about-card__pill" component="p">
          <span className="about-card__status-dot" aria-hidden />
          <span>{pickLocale(aboutCopy.openToWork, locale)}</span>
        </Box>
      </Box>
    </Box>
  )
}
