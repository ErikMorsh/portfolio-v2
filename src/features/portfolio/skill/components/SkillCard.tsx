import { Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'
import { pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { skillPaths, type Skill } from '../lib/skills'
import { SkillIcons } from './SkillIcons'

type SkillCardProps = {
  skill: Skill
}

export function SkillCard({ skill }: SkillCardProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const params = useParams<{ skillId?: string }>()
  const skillId = typeof params.skillId === 'string' ? params.skillId : undefined
  const { locale } = useAppTheme()
  const isSelected = skillId === skill.id
  const title = pickLocale(skill.title, locale)

  const openDetail = () => {
    router.push(skillPaths.detail(skill.id))
  }

  return (
    <Paper
      className={['skill-card', isSelected && 'skill-card--selected'].filter(Boolean).join(' ')}
      elevation={0}
      style={{ '--skill-glow': skill.glowColor } as React.CSSProperties}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${t('skill.viewDetails')}: ${title}`}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openDetail()
        }
      }}
    >
      <span className="skill-card__glow" aria-hidden />
      <SkillIcons
        className="skill-card__icons"
        icons={skill.icons}
        label={title}
      />
      <Typography className="skill-card__title" component="h3" variant="body2">
        {title}
      </Typography>
    </Paper>
  )
}
