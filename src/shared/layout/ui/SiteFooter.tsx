'use client'

import { Box, Typography } from '@mui/material'
import { personal, pickLocale } from '@/cv-data'
import { heroCopy } from '@/features/hero/data/hero'
import { useAppTheme } from '@/theme'

const COPYRIGHT_YEAR = 2026

export function SiteFooter() {
  const { locale } = useAppTheme()
  const fullName = pickLocale(personal.fullName, locale)

  return (
    <Box className="site-footer" component="footer">
      <Box className="site-footer__shell">
        <Typography className="site-footer__copy" component="p">
          © {COPYRIGHT_YEAR} {fullName}.{' '}
          {locale === 'fa'
            ? 'تمامی حقوق محفوظ است.'
            : 'All rights reserved.'}
        </Typography>

        <Box className="site-footer__availability" role="status">
          <span className="site-footer__availability-dot" aria-hidden />
          <span>{pickLocale(heroCopy.availability, locale)}</span>
        </Box>
      </Box>
    </Box>
  )
}
