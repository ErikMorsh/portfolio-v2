import type { PaletteMode } from '@mui/material'

export type AppCssVarName =
  | '--app-bg'
  | '--app-ink'
  | '--app-muted'
  | '--app-faint'
  | '--app-border'
  | '--app-border-strong'
  | '--app-card'
  | '--app-card-hover'
  | '--app-surface-elevated'
  | '--app-media-bg'
  | '--app-accent'
  | '--app-accent-soft'
  | '--app-accent-border'
  | '--app-rail'
  | '--app-glow-opacity'
  | '--app-input-bg'
  | '--app-shadow'
  | '--app-color-primary'

export type AppCssVars = Record<AppCssVarName, string>

export const appCssVarsByMode: Record<PaletteMode, AppCssVars> = {
  light: {
    '--app-bg': '#f5f7fb',
    '--app-ink': '#1a1830',
    '--app-muted': 'rgba(26, 24, 48, 0.68)',
    '--app-faint': 'rgba(26, 24, 48, 0.48)',
    '--app-border': 'rgba(26, 24, 48, 0.1)',
    '--app-border-strong': 'rgba(26, 24, 48, 0.18)',
    '--app-card': '#ffffff',
    '--app-card-hover': '#eef1f8',
    '--app-surface-elevated': 'rgba(255, 255, 255, 0.26)',
    '--app-media-bg': '#e8ebf4',
    '--app-accent': '#6d28d9',
    '--app-accent-soft': 'rgba(109, 40, 217, 0.12)',
    '--app-accent-border': 'rgba(109, 40, 217, 0.35)',
    '--app-rail': 'rgba(26, 24, 48, 0.12)',
    '--app-glow-opacity': '0.9',
    '--app-input-bg': 'rgba(26, 24, 48, 0.03)',
    '--app-shadow': '0 12px 28px rgba(26, 24, 48, 0.08)',
    '--app-color-primary': '#2563d4',
  },
  dark: {
    '--app-bg': '#0b0a14',
    '--app-ink': '#f4f1ff',
    '--app-muted': 'rgba(226, 220, 255, 0.72)',
    '--app-faint': 'rgba(226, 220, 255, 0.48)',
    '--app-border': 'rgba(226, 220, 255, 0.1)',
    '--app-border-strong': 'rgba(226, 220, 255, 0.18)',
    '--app-card': '#14121f',
    '--app-card-hover': '#181528',
    '--app-surface-elevated': 'rgba(22, 18, 40, 0.72)',
    '--app-media-bg': '#1a1628',
    '--app-accent': '#a78bfa',
    '--app-accent-soft': 'rgba(167, 139, 250, 0.18)',
    '--app-accent-border': 'rgba(167, 139, 250, 0.45)',
    '--app-rail': 'rgba(226, 220, 255, 0.14)',
    '--app-glow-opacity': '0.85',
    '--app-input-bg': 'rgba(255, 255, 255, 0.03)',
    '--app-shadow': '0 12px 30px rgba(0, 0, 0, 0.22)',
    '--app-color-primary': '#74a0f5',
  },
}
