import type { ElementType, ReactNode } from 'react'
import type { ContainerSize } from '../tokens'

type ContainerProps = {
  children: ReactNode
  size?: ContainerSize
  className?: string
  as?: ElementType
}

const sizeClassName: Record<ContainerSize, string> = {
  default: 'layout-container--default',
  narrow: 'layout-container--narrow',
  wide: 'layout-container--wide',
  full: 'layout-container--full',
}

export function Container({
  children,
  size = 'default',
  className,
  as: Component = 'div',
}: ContainerProps) {
  const classes = ['layout-container', sizeClassName[size], className]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}
