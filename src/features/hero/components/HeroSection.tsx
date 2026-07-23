import { Box } from '@mui/material'
import { HeroContent } from './HeroContent'
import { HeroPortrait } from './HeroPortrait'
import '../styles/hero.scss'

export function HeroSection() {
  return (
    <Box className="hero" component="section" id="home">
      <Box className="hero__shell">
        <Box className="hero__stage">
          <HeroContent />
          <HeroPortrait />
        </Box>
      </Box>
    </Box>
  )
}
