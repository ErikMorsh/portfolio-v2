'use client'

import type { ReactNode } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { AppThemeProvider } from '@/theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <I18nextProvider i18n={i18n}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </I18nextProvider>
    </AppRouterCacheProvider>
  )
}
