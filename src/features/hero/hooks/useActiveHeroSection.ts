'use client'

import { useEffect, useState } from 'react'
import { heroNavItems } from '../data/hero'

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function useHeroSectionProgress() {
  const [activeId, setActiveId] = useState(heroNavItems[0]?.id ?? 'home')
  const [fills, setFills] = useState<number[]>(() =>
    heroNavItems.map((_, index) => (index === 0 ? 1 : 0)),
  )

  useEffect(() => {
    const sync = () => {
      const viewportMid = window.innerHeight * 0.35

      const nextFills = heroNavItems.map((item) => {
        const el = document.getElementById(item.id)
        if (!el) return 0

        const rect = el.getBoundingClientRect()
        const start = rect.top - viewportMid
        const end = rect.bottom - viewportMid

        if (end <= 0) return 1
        if (start >= 0) return 0
        return clamp(1 - end / (end - start))
      })

      let current = heroNavItems[0]?.id ?? 'home'
      for (let i = 0; i < nextFills.length; i += 1) {
        if (nextFills[i] > 0 && nextFills[i] < 1) {
          current = heroNavItems[i].id
          break
        }
        if (nextFills[i] === 1) {
          current = heroNavItems[i].id
        }
      }

      setFills(nextFills)
      setActiveId(current)
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  return { activeId, fills }
}
