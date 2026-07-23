import { Box, Paper, Typography } from '@mui/material'
import { about, assetSrc, personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'

export function WelcomeHeader() {
  const { locale } = useAppTheme()

  return (
    <Paper className="welcome__header" elevation={0} component="header">
      <Box className="welcome__avatar-wrap">
        <img
          className="welcome__avatar"
          src={assetSrc(personal.profilePhoto.src)}
          alt={pickLocale(personal.profilePhoto.alt, locale)}
        />
      </Box>

      <Box className="welcome__header-content">
        <Typography className="welcome__name" component="h1" variant="h3">
          {pickLocale(personal.fullName, locale)}
        </Typography>

        <Typography className="welcome__title" component="p" color="primary">
          {pickLocale(personal.title, locale)}
        </Typography>

        <Box className="welcome__bio">
          {about.paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              className="welcome__bio-text"
              component="p"
              color="text.secondary"
            >
              {pickLocale(paragraph, locale)}
            </Typography>
          ))}
        </Box>
      </Box>
    </Paper>
  )
}
