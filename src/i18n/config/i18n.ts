'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { isLocale, type Locale } from '@/shared/types'
import en from '../locales/en.json'
import fa from '../locales/fa.json'

const STORAGE_KEY = 'portfolio-locale'

const getStoredLocale = (): Locale | null => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && isLocale(stored)) return stored
  return null
}

const getInitialLocale = (): Locale => getStoredLocale() ?? 'fa'

if (!i18n.isInitialized) {
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
}

export const setAppLocale = (locale: Locale) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
  }
  void i18n.changeLanguage(locale)
}

if (typeof window !== 'undefined') {
  setAppLocale(getInitialLocale())
}

export default i18n
