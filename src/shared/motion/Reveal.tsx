'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

export const revealEase = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

type RevealProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  duration?: number
  id?: string
}

/** Fades/slides up the first time it enters the viewport. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  duration = 0.55,
  id,
}: RevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ duration, delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  )
}

type RevealGroupProps = {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  as?: 'div' | 'ul'
  id?: string
}

/** Parent that staggers children on first observe. Pair with `RevealItem`. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.04,
  as = 'div',
  id,
}: RevealGroupProps) {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  }

  const shared = {
    id,
    className,
    variants,
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once: true, amount: 0.15, margin: '0px 0px -6% 0px' },
  }

  if (as === 'ul') {
    return <motion.ul {...shared}>{children}</motion.ul>
  }

  return <motion.div {...shared}>{children}</motion.div>
}

type RevealItemProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  as?: 'div' | 'li'
  id?: string
}

/** Child item for use inside `RevealGroup`. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = 'div',
  id,
}: RevealItemProps) {
  const shared = {
    id,
    className,
    variants,
    transition: { duration: 0.5, ease: revealEase },
  }

  if (as === 'li') {
    return <motion.li {...shared}>{children}</motion.li>
  }

  return <motion.div {...shared}>{children}</motion.div>
}
