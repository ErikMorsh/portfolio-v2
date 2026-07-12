import { Box } from '@mui/material'
import { Outlet, useMatch } from 'react-router-dom'
import { useWelcomeScrollRestoration } from '../hooks/useWelcomeScrollRestoration'
import { WelcomeMain } from './WelcomeMain'
import { WelcomePortfolioSource } from './WelcomePortfolioSource'
import { WelcomeSidebar } from './WelcomeSidebar'

export function WelcomeBody() {
  const projectDetailMatch = useMatch('/:jobId/:projectId')
  const skillDetailMatch = useMatch('/skills/:skillId')
  const jobDetailMatch = useMatch('/:jobId')

  const isSkillDetail = Boolean(skillDetailMatch)
  const isProjectDetail = Boolean(
    projectDetailMatch && projectDetailMatch.params.jobId !== 'skills',
  )
  const isJobDetail = Boolean(
    jobDetailMatch &&
      !isSkillDetail &&
      !isProjectDetail &&
      jobDetailMatch.params.jobId !== 'skills',
  )
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
      >
        <Outlet />
      </Box>
    </Box>
  )
}
