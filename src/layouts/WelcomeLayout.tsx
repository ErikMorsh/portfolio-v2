import { AboutSection } from '@/features/about'
import { ContactSection } from '@/features/contact'
import { ExperienceSection } from '@/features/experience'
import { HeroSection } from '@/features/hero'
import { ProjectsSection } from '@/features/projects'
import { SkillsSection } from '@/features/skills'
import { Page } from '@/shared/layout'

export function WelcomeLayout() {
  return (
    <Page className="welcome-page">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </Page>
  )
}
