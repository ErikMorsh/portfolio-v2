'use client'

import { Box } from '@mui/material'
import { RevealGroup, RevealItem } from '@/shared/motion'
import { AboutCard } from './AboutCard'
import { AboutContent } from './AboutContent'
import '../styles/about.scss'

export function AboutSection() {
  return (
    <Box className="about" component="section" id="about">
      <Box className="about__shell">
        <RevealGroup className="about__stage">
          <RevealItem>
            <AboutContent />
          </RevealItem>
          <RevealItem>
            <AboutCard />
          </RevealItem>
        </RevealGroup>
      </Box>
    </Box>
  )
}
