import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { jobPaths } from '@/features/job/lib/jobs'
import { AppLayout } from '@/shared/layout'
import {
  JobDetailContent,
  JobsPage,
  ProjectDetailContent,
  SkillDetailContent,
  WelcomeLayout,
} from './lazyRoutes'
import { RouteFallback } from './RouteFallback'
import '@/shared/styles/global.scss'

function App() {
  const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={routerBasename || undefined}>
      <AppLayout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<WelcomeLayout />}>
              <Route path="skills/:skillId" element={<SkillDetailContent />} />
              <Route path=":jobId/:projectId" element={<ProjectDetailContent />} />
              <Route path=":jobId" element={<JobDetailContent />} />
            </Route>
            <Route path={jobPaths.list} element={<JobsPage />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
