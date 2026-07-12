import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { AppThemeProvider } from '@/theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <AppThemeProvider>{children}</AppThemeProvider>
    </I18nextProvider>
  )
}
