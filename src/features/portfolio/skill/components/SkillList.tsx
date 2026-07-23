import { Box } from '@mui/material'
import '../styles/skill.scss'
import { getAllSkills } from '../lib/skills'
import { SkillCard } from './SkillCard'

type SkillListProps = {
  className?: string
}

export function SkillList({ className }: SkillListProps) {
  const skills = getAllSkills()
  const classes = ['skill-list', className].filter(Boolean).join(' ')

  return (
    <Box className={classes}>
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </Box>
  )
}
