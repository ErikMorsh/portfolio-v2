export type PortfolioStackItem = {
  id: string
  name: string
  color: string
  share: number
}

export const portfolioRepository = {
  href: 'https://github.com/ErikMorsh/portfolio-v2',
  label: 'ErikMorsh/portfolio-v2',
} as const

export const portfolioStack: PortfolioStackItem[] = [
  { id: 'typescript', name: 'TypeScript', color: '#3178c6', share: 34 },
  { id: 'react', name: 'React', color: '#61dafb', share: 26 },
  { id: 'scss', name: 'SCSS', color: '#c6538c', share: 18 },
  { id: 'mui', name: 'MUI', color: '#007fff', share: 12 },
  { id: 'vite', name: 'Vite', color: '#646cff', share: 6 },
  { id: 'router', name: 'React Router', color: '#ca4245', share: 4 },
]
