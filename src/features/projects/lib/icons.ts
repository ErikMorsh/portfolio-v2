import ChatRoundedIcon from '@mui/icons-material/ChatRounded'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded'
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded'
import WebRoundedIcon from '@mui/icons-material/WebRounded'
import type { SvgIconComponent } from '@mui/icons-material'
import type { ProjectsShowcaseIcon } from '../data/projects'

export const projectIconMap: Record<ProjectsShowcaseIcon, SvgIconComponent> = {
  crm: DashboardCustomizeRoundedIcon,
  chat: ChatRoundedIcon,
  cms: WebRoundedIcon,
  migration: SyncAltRoundedIcon,
}
