import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import { Box, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppTheme } from '@/theme'
import { heroCopy, heroNavItems } from '../data/hero'

export function HeroNav() {
  const { t } = useTranslation()
  const { mode, toggleLocale, toggleMode } = useAppTheme()

  return (
    <Box className="hero-nav" component="nav" aria-label={t('hero.nav.label')}>
      <a className="hero-nav__brand" href="#home" aria-label={t('hero.nav.brand')}>
        {heroCopy.brandInitials}
      </a>

      <Box className="hero-nav__links" component="ul">
        {heroNavItems.map((item) => (
          <Box key={item.id} component="li">
            <a
              className={[
                'hero-nav__link',
                item.id === 'home' ? 'hero-nav__link--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              href={item.href}
            >
              {t(item.labelKey)}
            </a>
          </Box>
        ))}
      </Box>

      <Box className="hero-nav__actions">
        <IconButton
          className="hero-nav__icon-btn"
          size="small"
          onClick={toggleMode}
          aria-label={t('theme.toggle')}
        >
          {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton
          className="hero-nav__icon-btn"
          size="small"
          onClick={toggleLocale}
          aria-label={t('language.toggle')}
        >
          <LanguageIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
