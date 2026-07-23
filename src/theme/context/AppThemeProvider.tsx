import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { PaletteMode } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { setAppLocale } from '@/i18n'
import type { Locale } from '@/shared/types'
import { createAppTheme } from '../config/createAppTheme'

const THEME_STORAGE_KEY = 'portfolio-theme-mode'

type ThemeModeContextValue = {
  mode: PaletteMode
  locale: Locale
  toggleMode: () => void
  toggleLocale: () => void
  setLocale: (locale: Locale) => void
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)

const getInitialMode = (): PaletteMode => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const [mode, setMode] = useState<PaletteMode>(getInitialMode)
  const locale = (i18n.language === 'en' ? 'en' : 'fa') as Locale

  const theme = useMemo(() => createAppTheme(mode, locale), [mode, locale])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.colorScheme = mode
  }, [mode])

  const toggleMode = useCallback(() => {
    setMode((current) => {
      const next = current === 'light' ? 'dark' : 'light'
      localStorage.setItem(THEME_STORAGE_KEY, next)
      return next
    })
  }, [])

  const setLocale = useCallback((nextLocale: Locale) => {
    setAppLocale(nextLocale)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'fa' ? 'en' : 'fa')
  }, [locale, setLocale])

  const value = useMemo(
    () => ({
      mode,
      locale,
      toggleMode,
      toggleLocale,
      setLocale,
    }),
    [mode, locale, toggleMode, toggleLocale, setLocale],
  )

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export const useAppTheme = () => {
  const context = useContext(ThemeModeContext)
  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider')
  }
  return context
}
