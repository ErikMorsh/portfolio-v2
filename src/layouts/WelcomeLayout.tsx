'use client'

import { AboutSection } from '@/features/portfolio/about'
import { ContactSection } from '@/features/portfolio/contact'
import { ExperienceSection } from '@/features/portfolio/experience'
import { HeroNav, HeroSection, PageScrollIndicator } from '@/features/portfolio/hero'
import { ProjectsSection } from '@/features/portfolio/projects'
import { SkillsSection } from '@/features/portfolio/skills'
import { Page, SiteFooter } from '@/shared/layout'

export function WelcomeLayout() {
  return (
    <>
      <HeroNav />
      <Page className="welcome-page">
        <PageScrollIndicator />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <SiteFooter />
      </Page>
    </>
  )
}
