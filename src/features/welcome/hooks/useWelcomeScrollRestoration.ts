import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const scrollTo = (top: number) => {
  window.scrollTo({ top, left: 0, behavior: 'auto' })
}

export function useWelcomeScrollRestoration(isDetailOpen: boolean) {
  const { pathname } = useLocation()
  const savedScrollYRef = useRef(0)
  const wasDetailOpenRef = useRef(false)
  const previousPathnameRef = useRef(pathname)

  useLayoutEffect(() => {
    const openingDetail = isDetailOpen && !wasDetailOpenRef.current
    const closingDetail = !isDetailOpen && wasDetailOpenRef.current
    const switchingDetail =
      isDetailOpen &&
      wasDetailOpenRef.current &&
      pathname !== previousPathnameRef.current

    if (openingDetail) {
      savedScrollYRef.current = window.scrollY
      scrollTo(0)
    } else if (closingDetail) {
      scrollTo(savedScrollYRef.current)
    } else if (switchingDetail) {
      scrollTo(0)
    }

    wasDetailOpenRef.current = isDetailOpen
    previousPathnameRef.current = pathname
  }, [isDetailOpen, pathname])
}
