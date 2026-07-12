export const LAYOUT = {
  maxWidth: 1120,
  narrowWidth: 760,
  paddingInline: 24,
  paddingBlock: 24,
} as const

export type ContainerSize = 'default' | 'narrow' | 'wide' | 'full'
