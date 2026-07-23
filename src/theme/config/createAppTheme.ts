import { createTheme, type ThemeOptions } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'
import type { Locale } from '@/shared/types'
import { appCssVarsByMode } from './appCssVars'

const paletteTokens = {
  light: { primary: '#2563d4' },
  dark: { primary: '#74a0f5' },
} as const

const getPalette = (mode: PaletteMode): ThemeOptions['palette'] => ({
  mode,
  primary: {
    main: paletteTokens[mode].primary,
  },
  secondary: {
    main: mode === 'light' ? '#5c6bc0' : '#7986cb',
  },
  background: {
    default: mode === 'light' ? '#f5f7fb' : '#0b0a14',
    paper: mode === 'light' ? '#ffffff' : '#171a21',
  },
  text: {
    primary: mode === 'light' ? '#1a1830' : '#f4f1ff',
    secondary: mode === 'light' ? 'rgba(26, 24, 48, 0.68)' : 'rgba(226, 220, 255, 0.72)',
  },
})

export const createAppTheme = (mode: PaletteMode, locale: Locale) => {
  const cssVars = appCssVarsByMode[mode]

  return createTheme({
    direction: locale === 'fa' ? 'rtl' : 'ltr',
    palette: getPalette(mode),
    typography: {
      fontFamily:
        locale === 'fa'
          ? '"Vazirmatn", "Segoe UI", Tahoma, sans-serif'
          : '"Syne", "Segoe UI", "Helvetica Neue", sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            ...cssVars,
            colorScheme: mode,
          },
          body: {
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
            color: 'var(--app-ink)',
          },
        },
      },
    },
  })
}
