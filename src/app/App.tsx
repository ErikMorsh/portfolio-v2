import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JobDetailContent, JobsPage, jobPaths } from '@/features/job'
import { ProjectDetailContent } from '@/features/project'
import { SkillDetailContent } from '@/features/skill'
import { WelcomeLayout } from '@/layouts'
import { AppLayout } from '@/shared/layout'
import '@/shared/styles/global.scss'
import '@/features/job/styles/job.scss'
import '@/features/project/styles/project.scss'
import '@/features/skill/styles/skill.scss'

function App() {
  const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={routerBasename || undefined}>
      <AppLayout>
        <Routes>
          <Route path="/" element={<WelcomeLayout />}>
            <Route path="skills/:skillId" element={<SkillDetailContent />} />
            <Route path=":jobId/:projectId" element={<ProjectDetailContent />} />
            <Route path=":jobId" element={<JobDetailContent />} />
          </Route>
          <Route path={jobPaths.list} element={<JobsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
