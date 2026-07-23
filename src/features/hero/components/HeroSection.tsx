import { Box } from '@mui/material'
import { HeroContent } from './HeroContent'
import { HeroNav } from './HeroNav'
import { HeroPortrait } from './HeroPortrait'
import '../styles/hero.scss'

export function HeroSection() {
  return (
    <Box className="hero" component="section" id="home">
      <Box className="hero__shell">
        <HeroNav />
        <Box className="hero__stage">
          <span className="hero__stage-glow" aria-hidden />
          <HeroContent />
          <HeroPortrait />
        </Box>
      </Box>
    </Box>
  )
}
