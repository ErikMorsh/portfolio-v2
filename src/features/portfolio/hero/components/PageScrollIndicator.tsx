'use client'

import { type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { heroNavItems } from '../data/hero'
import { useHeroSectionProgress } from '../hooks/useActiveHeroSection'
import '../styles/hero.scss'

export function PageScrollIndicator() {
  const { t } = useTranslation()
  const { activeId, fills } = useHeroSectionProgress()

  return (
    <nav className="page-scroll-indicator" aria-label={t('hero.nav.label')}>
      <ul className="page-scroll-indicator__sections">
        {heroNavItems.map((item, index) => {
          const fill = fills[index] ?? 0
          const active = item.id === activeId
          const visited = fill >= 1

          return (
            <li key={item.id}>
              <a
                className={[
                  'page-scroll-indicator__section',
                  visited ? 'page-scroll-indicator__section--visited' : '',
                  active ? 'page-scroll-indicator__section--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                href={item.href}
                aria-label={t(item.labelKey)}
                aria-current={active ? 'true' : undefined}
                style={{ '--segment-fill': String(fill) } as CSSProperties}
              >
                <span className="page-scroll-indicator__track" aria-hidden>
                  <span className="page-scroll-indicator__fill" />
                </span>
                <span className="page-scroll-indicator__title">{t(item.labelKey)}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
