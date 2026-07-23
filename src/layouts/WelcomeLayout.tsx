import { Box } from '@mui/material'
import { AboutSection } from '@/features/about'
import { HeroSection } from '@/features/hero'
import { Page } from '@/shared/layout'

function SectionPlaceholder({
  id,
  title,
}: {
  id: string
  title: string
}) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        scrollMarginTop: '1.5rem',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 8,
        color: 'text.secondary',
      }}
    >
      <Box component="h2" sx={{ m: 0, fontSize: '1.5rem', fontWeight: 700 }}>
        {title}
      </Box>
    </Box>
  )
}

export function WelcomeLayout() {
  return (
    <Page className="welcome-page">
      <HeroSection />
      <AboutSection />
      <SectionPlaceholder id="skills" title="Skills" />
      <SectionPlaceholder id="projects" title="Projects" />
      <SectionPlaceholder id="experience" title="Experience" />
      <SectionPlaceholder id="contact" title="Contact" />
    </Page>
  )
}
