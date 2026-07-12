import { createTheme, type ThemeOptions } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'
import type { Locale } from '@/shared/types'

const getPalette = (mode: PaletteMode): ThemeOptions['palette'] => ({
  mode,
  primary: {
    main: mode === 'light' ? '#3949ab' : '#9fa8da',
  },
  secondary: {
    main: mode === 'light' ? '#5c6bc0' : '#7986cb',
  },
  background: {
    default: mode === 'light' ? '#f5f7fb' : '#0f1117',
    paper: mode === 'light' ? '#ffffff' : '#171a21',
  },
})

export const createAppTheme = (mode: PaletteMode, locale: Locale) =>
  createTheme({
    direction: locale === 'fa' ? 'rtl' : 'ltr',
    palette: getPalette(mode),
    typography: {
      fontFamily:
        locale === 'fa'
          ? '"Vazirmatn", "Segoe UI", Tahoma, sans-serif'
          : '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minHeight: '100vh',
          },
        },
      },
    },
  })
