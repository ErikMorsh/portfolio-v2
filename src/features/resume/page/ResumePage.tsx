'use client'

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { personal } from '@/cv-data'
import '../styles/resume-page.scss'

function resolvePublicUrl(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

export function ResumePage() {
  const { t } = useTranslation()
  const [viewerSrc, setViewerSrc] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const pdfSrc = resolvePublicUrl(personal.resume.pdfSrc)

  useEffect(() => {
    const controller = new AbortController()
    let objectUrl = ''

    const load = async () => {
      try {
        const response = await fetch(pdfSrc, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to load resume (${response.status})`)
        }

        const bytes = await response.arrayBuffer()
        const magic = new TextDecoder('ascii').decode(bytes.slice(0, 5))
        if (magic !== '%PDF-') {
          throw new Error('Resume response is not a PDF')
        }

        // Preview-only blob (no download attribute). Avoid URL hashes — they break Chrome's viewer.
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
        setViewerSrc(objectUrl)
      } catch (error) {
        if (controller.signal.aborted) return
        setFailed(true)
        console.error(error)
      }
    }

    void load()

    return () => {
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [pdfSrc])

  return (
    <main className="resume-page">
      <header className="resume-page__toolbar">
        <span className="resume-page__title">{personal.resume.fileName}</span>
        {viewerSrc ? (
          <Button
            className="resume-page__download"
            component="a"
            href={viewerSrc}
            download={personal.resume.fileName}
            variant="contained"
            size="small"
            startIcon={<DownloadRoundedIcon />}
            aria-label={t('hero.resumeDownloadAria')}
          >
            {t('hero.resumeDownload')}
          </Button>
        ) : null}
      </header>

      {viewerSrc ? (
        <iframe
          className="resume-page__viewer"
          src={viewerSrc}
          title={personal.resume.fileName}
        />
      ) : (
        <p className="resume-page__fallback">
          {failed ? t('hero.resumeLoadError') : t('hero.resumeLoading')}
        </p>
      )}
    </main>
  )
}
