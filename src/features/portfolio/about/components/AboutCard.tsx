'use client'

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { Box, IconButton, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { assetSrc, personal, pickLocale } from '@/cv-data'
import { useAppTheme } from '@/theme'
import { aboutCopy } from '../data/about'

const AboutLocationMap = dynamic(
  () => import('./AboutLocationMap').then((mod) => mod.AboutLocationMap),
  { ssr: false, loading: () => <div className="about-card__map about-card__map--loading" /> },
)

const FLIP_MS = 620

function nextFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve())
    })
  })
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function AboutCard() {
  const { t } = useTranslation()
  const { locale } = useAppTheme()
  const [flipped, setFlipped] = useState(false)
  const [mapSettled, setMapSettled] = useState(false)
  const [noTransition, setNoTransition] = useState(false)
  const locationBtnRef = useRef<HTMLButtonElement | null>(null)
  const backBtnRef = useRef<HTMLButtonElement | null>(null)
  const closingRef = useRef(false)
  const flippedRef = useRef(flipped)
  const mapSettledRef = useRef(mapSettled)

  flippedRef.current = flipped
  mapSettledRef.current = mapSettled

  useEffect(() => {
    if (!flipped) {
      setMapSettled(false)
      return
    }

    const delay = prefersReducedMotion() ? 0 : FLIP_MS
    const timeout = window.setTimeout(() => {
      setMapSettled(true)
      backBtnRef.current?.focus({ preventScroll: true })
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [flipped])

  const closeMap = useCallback(async () => {
    if (closingRef.current || !flippedRef.current) return
    closingRef.current = true

    try {
      if (mapSettledRef.current) {
        // Restore the mid-flip pose instantly, then animate back to the front.
        setNoTransition(true)
        setMapSettled(false)
        await nextFrame()
        setNoTransition(false)
        await nextFrame()
      }

      setFlipped(false)

      window.setTimeout(
        () => {
          locationBtnRef.current?.focus({ preventScroll: true })
          closingRef.current = false
        },
        prefersReducedMotion() ? 0 : FLIP_MS,
      )
    } catch {
      closingRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!flipped) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        void closeMap()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [flipped, closeMap])

  const openMap = () => {
    if (closingRef.current) return
    setFlipped(true)
  }

  return (
    <Box
      className={[
        'about-card-scene',
        flipped ? 'about-card-scene--flipped' : '',
        mapSettled ? 'about-card-scene--map-settled' : '',
        noTransition ? 'about-card-scene--no-transition' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Box className="about-card-flip">
        <Box className="about-card about-card--front" aria-hidden={flipped}>
          <Box className="about-card__portrait">
            <img
              className="about-card__image"
              src={assetSrc(personal.profilePhoto.src)}
              alt={pickLocale(personal.profilePhoto.alt, locale)}
            />
          </Box>

          <Typography className="about-card__name" component="h3">
            {pickLocale(personal.fullName, locale)}
          </Typography>
          <Typography className="about-card__role" component="p">
            {pickLocale(personal.title, locale)}
          </Typography>
          <Typography className="about-card__stack" component="p">
            {pickLocale(aboutCopy.stackSubtitle, locale)}
          </Typography>

          <Box className="about-card__meta">
            <Box
              className="about-card__pill about-card__pill--location"
              component="button"
              type="button"
              ref={locationBtnRef}
              onClick={openMap}
              aria-expanded={flipped}
              aria-label={pickLocale(aboutCopy.showLocationMap, locale)}
              tabIndex={flipped ? -1 : 0}
              disabled={flipped}
            >
              <LocationOnRoundedIcon className="about-card__pill-icon about-card__pill-icon--pin" />
              <span>{pickLocale(personal.location, locale)}</span>
            </Box>
            <Box className="about-card__pill" component="p">
              <span className="about-card__status-dot" aria-hidden />
              <span>{pickLocale(aboutCopy.openToWork, locale)}</span>
            </Box>
          </Box>
        </Box>

        <Box className="about-card about-card--back" aria-hidden={!flipped}>
          <Box className="about-card__map-toolbar">
            <IconButton
              className="about-card__back-btn"
              type="button"
              size="small"
              ref={backBtnRef}
              onClick={() => void closeMap()}
              aria-label={t('about.mapBack')}
              tabIndex={flipped ? 0 : -1}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Typography className="about-card__map-title" component="p">
              {pickLocale(personal.location, locale)}
            </Typography>
          </Box>

          <Box className="about-card__map-shell">
            {mapSettled ? (
              <AboutLocationMap key="about-location-map" active={mapSettled} />
            ) : (
              <div className="about-card__map about-card__map--loading" aria-hidden />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
