import { ImageResponse } from 'next/og'
import { siteConfig } from '@/shared/lib/site'

export const runtime = 'edge'
export const alt = `${siteConfig.name} — ${siteConfig.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(145deg, #0b0a14 0%, #16122a 55%, #1a1435 100%)',
          color: '#f4f1ff',
          fontFamily: 'Segoe UI, Helvetica Neue, Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#a78bfa',
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {'</>'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: 'rgba(226, 220, 255, 0.78)',
              fontWeight: 500,
            }}
          >
            {siteConfig.title}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 24,
              color: 'rgba(167, 139, 250, 0.95)',
              fontWeight: 500,
            }}
          >
            React · Next.js · TypeScript
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
