import { Box } from '@mui/material'
import '../styles/job.scss'
import { getAllJobs } from '../lib/jobs'
import { JobCard } from './JobCard'

type JobListProps = {
  className?: string
}

export function JobList({ className }: JobListProps) {
  const jobs = getAllJobs()
  const classes = ['job-list', className].filter(Boolean).join(' ')

  return (
    <Box className={classes}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Box>
  )
}
