import { Box } from '@mui/material'
import { AboutCard } from './AboutCard'
import { AboutContent } from './AboutContent'
import '../styles/about.scss'

export function AboutSection() {
  return (
    <Box className="about" component="section" id="about">
      <Box className="about__shell">
        <Box className="about__stage">
          <AboutContent />
          <AboutCard />
        </Box>
      </Box>
    </Box>
  )
}
