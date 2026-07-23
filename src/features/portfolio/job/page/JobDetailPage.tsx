import { JobDetailContent } from '../components/JobDetailContent'
import { Page } from '@/shared/layout'
import '../styles/job.scss'

/** Standalone job detail page (e.g. direct URL outside welcome shell). */
export function JobDetailPage() {
  return (
    <Page className="job-page job-page--detail">
      <JobDetailContent />
    </Page>
  )
}
