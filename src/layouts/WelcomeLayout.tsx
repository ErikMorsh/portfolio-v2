'use client'

import { AboutSection } from '@/features/about'
import { ContactSection } from '@/features/contact'
import { ExperienceSection } from '@/features/experience'
import { HeroNav, HeroSection, PageScrollIndicator } from '@/features/hero'
import { ProjectsSection } from '@/features/projects'
import { SkillsSection } from '@/features/skills'
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
