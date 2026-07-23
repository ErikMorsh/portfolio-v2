import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useWelcomeScrollRestoration } from '../hooks/useWelcomeScrollRestoration'
import { WelcomeMain } from './WelcomeMain'
import { WelcomePortfolioSource } from './WelcomePortfolioSource'
import { WelcomeSidebar } from './WelcomeSidebar'

export function WelcomeBody() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const isSkillDetail = segments[0] === 'skills' && Boolean(segments[1])
  const isProjectDetail =
    segments.length >= 2 && segments[0] !== 'skills' && segments[0] !== 'jobs'
  const isJobDetail =
    segments.length === 1 &&
    !['skills', 'jobs', 'resume'].includes(segments[0] ?? '')
  const isDetailOpen = isJobDetail || isProjectDetail || isSkillDetail

  useWelcomeScrollRestoration(isDetailOpen)

  const bodyClassName = [
    'welcome__body',
    isDetailOpen && 'welcome__body--detail',
    isJobDetail && 'welcome__body--detail-job',
    isProjectDetail && 'welcome__body--detail-project',
    isSkillDetail && 'welcome__body--detail-skill',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Box className={bodyClassName}>
      <Box className="welcome__sidebar-column">
        <WelcomeSidebar />
        <WelcomePortfolioSource />
      </Box>
      <WelcomeMain />
      <Box
        className="welcome__main2"
        component="section"
        aria-hidden={!isDetailOpen}
      />
    </Box>
  )
}
