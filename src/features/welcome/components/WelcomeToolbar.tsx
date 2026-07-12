import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppTheme } from '@/theme'

export function WelcomeToolbar() {
  const { t } = useTranslation()
  const { mode, locale, toggleLocale, toggleMode } = useAppTheme()

  return (
    <Box
      className="welcome__toolbar"
      sx={{ bgcolor: 'background.default' }}
    >
      <Button
        variant="outlined"
        size="small"
        startIcon={
          mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />
        }
        onClick={toggleMode}
        aria-label={t('theme.toggle')}
      >
        {mode === 'light' ? t('theme.dark') : t('theme.light')}
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<LanguageIcon />}
        onClick={toggleLocale}
        aria-label={t('language.toggle')}
      >
        {locale === 'fa' ? t('language.en') : t('language.fa')}
      </Button>
    </Box>
  )
}
