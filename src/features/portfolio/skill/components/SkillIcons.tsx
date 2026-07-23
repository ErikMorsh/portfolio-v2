import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined'
import type { ComponentType } from 'react'
import type { SkillIconId } from '@/cv-data'
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGo,
  SiMongodb,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiNuxt,
  SiPostgresql,
  SiQuasar,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiVuetify,
} from 'react-icons/si'

const iconMap = {
  vue: SiVuedotjs,
  nuxt: SiNuxt,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  vuetify: SiVuetify,
  quasar: SiQuasar,
  mui: SiMui,
  nestjs: SiNestjs,
  express: SiExpress,
  go: SiGo,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  git: SiGit,
  github: SiGithub,
  gitlab: SiGitlab,
} satisfies Record<
  Exclude<SkillIconId, 'translate'>,
  ComponentType<{ size?: number | string; color?: string }>
>

const iconBrandColors = {
  vue: '#41B883',
  nuxt: '#00DC82',
  typescript: '#3178C6',
  react: '#61DAFB',
  nextjs: '#000000',
  tailwind: '#06B6D4',
  vuetify: '#1867C2',
  quasar: '#1976D2',
  mui: '#007FFF',
  nestjs: '#E0234E',
  express: '#000000',
  go: '#00ADD8',
  postgresql: '#4169E1',
  mongodb: '#47A248',
  git: '#F05032',
  github: '#181717',
  gitlab: '#FC6D26',
} satisfies Record<Exclude<SkillIconId, 'translate'>, string>

type SkillIconsProps = {
  icons: SkillIconId[]
  className?: string
  label: string
  brandColors?: boolean
  accentColor?: string
}

export function SkillIcons({
  icons,
  className,
  label,
  brandColors = false,
  accentColor,
}: SkillIconsProps) {
  return (
    <span
      className={className}
      data-icon-count={icons.length}
      role="img"
      aria-label={label}
    >
      {icons.map((icon) => {
        if (icon === 'translate') {
          return (
            <TranslateOutlinedIcon
              key={icon}
              aria-hidden
              sx={brandColors && accentColor ? { color: accentColor } : undefined}
            />
          )
        }

        const Icon = iconMap[icon]
        return (
          <Icon
            key={icon}
            aria-hidden
            color={brandColors ? iconBrandColors[icon] : undefined}
          />
        )
      })}
    </span>
  )
}
