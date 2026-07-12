import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { isLocale, type Locale } from '@/shared/types'
import en from '../locales/en.json'
import fa from '../locales/fa.json'

const STORAGE_KEY = 'portfolio-locale'

const getInitialLocale = (): Locale => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && isLocale(stored)) return stored
  return 'fa'
}

void i18n.use(initReactI18next).init({
  resources: {
    fa: { translation: fa },
    en: { translation: en },
  },
  lng: getInitialLocale(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export const setAppLocale = (locale: Locale) => {
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
  void i18n.changeLanguage(locale)
}

setAppLocale(getInitialLocale())

export default i18n
