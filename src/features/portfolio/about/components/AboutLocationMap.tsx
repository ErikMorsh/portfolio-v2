'use client'

import { useEffect, useRef } from 'react'
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useAppTheme } from '@/theme'
import { tehranArea, tehranBounds, tehranCenter, tehranMapZoom } from '../data/tehran-area'
import 'leaflet/dist/leaflet.css'

type AboutLocationMapProps = {
  active: boolean
}

function MapResizer({ active }: { active: boolean }) {
  const map = useMap()
  const fittedRef = useRef(false)

  useEffect(() => {
    if (!active) {
      fittedRef.current = false
      return
    }

    const invalidate = () => {
      map.invalidateSize({ animate: false })
    }

    const fitOnce = () => {
      invalidate()
      if (fittedRef.current) return
      map.fitBounds(tehranBounds, {
        padding: [12, 12],
        maxZoom: 12,
        animate: false,
      })
      fittedRef.current = true
    }

    fitOnce()
    const frame = window.requestAnimationFrame(fitOnce)
    const t1 = window.setTimeout(fitOnce, 80)
    const t2 = window.setTimeout(invalidate, 320)

    const container = map.getContainer()
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => invalidate())
        : null
    observer?.observe(container)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      observer?.disconnect()
    }
  }, [active, map])

  return null
}

function ScrollWheelOnHover() {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()

    const enable = () => {
      map.scrollWheelZoom.enable()
    }
    const disable = () => {
      map.scrollWheelZoom.disable()
    }

    disable()
    container.addEventListener('mouseenter', enable)
    container.addEventListener('mouseleave', disable)

    return () => {
      container.removeEventListener('mouseenter', enable)
      container.removeEventListener('mouseleave', disable)
      disable()
    }
  }, [map])

  return null
}

export function AboutLocationMap({ active }: AboutLocationMapProps) {
  const { mode } = useAppTheme()
  const tileUrl =
    mode === 'light'
      ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

  const accent = mode === 'light' ? '#7c3aed' : '#a78bfa'

  return (
    <MapContainer
      className="about-card__map"
      center={tehranCenter}
      zoom={tehranMapZoom}
      scrollWheelZoom={false}
      dragging
      doubleClickZoom={false}
      touchZoom
      attributionControl={false}
      zoomControl={false}
    >
      <TileLayer url={tileUrl} />
      <GeoJSON
        key={mode}
        data={tehranArea}
        pathOptions={{
          color: accent,
          weight: 2,
          opacity: 0.95,
          fillColor: accent,
          fillOpacity: mode === 'light' ? 0.22 : 0.32,
        }}
      />
      <MapResizer active={active} />
      <ScrollWheelOnHover />
    </MapContainer>
  )
}
