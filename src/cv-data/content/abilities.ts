import type { AbilityGroup } from '../model/types'
import { ls } from '../lib/localize'

export const abilities: AbilityGroup[] = [
  {
    id: 'frontend',
    title: ls('فرانت‌اند', 'Front-End'),
    items: [
      { id: 'vue-nuxt', label: ls('Vue & Nuxt', 'Vue & Nuxt'), level: 92 },
      { id: 'typescript', label: ls('TypeScript', 'TypeScript'), level: 88 },
      { id: 'react-next', label: ls('React & Next', 'React & Next'), level: 75 },
    ],
  },
  {
    id: 'backend',
    title: ls('بک‌اند', 'Back-End'),
    items: [
      { id: 'nest-express', label: ls('Nest & Express', 'Nest & Express'), level: 65 },
      { id: 'fiber', label: ls('Fiber', 'Fiber'), level: 55 },
      { id: 'sql-nosql', label: ls('SQL & NoSQL', 'SQL & NoSQL'), level: 60 },
    ],
  },
  {
    id: 'language',
    title: ls('زبان', 'Language'),
    items: [{ id: 'english', label: ls('انگلیسی', 'English'), level: 70 }],
  },
]
