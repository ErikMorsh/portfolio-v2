import { isLocale, type Locale } from '@/shared/types'

export const LOCALE_STORAGE_KEY = 'portfolio-locale'
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export const localeFromCountry = (country: string | null | undefined): Locale | null => {
  if (!country) return null
  return country.toUpperCase() === 'IR' ? 'fa' : 'en'
}

export const localeFromAcceptLanguage = (
  acceptLanguage: string | null | undefined,
): Locale => {
  const value = acceptLanguage?.toLowerCase() ?? ''
  if (value.includes('fa')) return 'fa'
  return 'en'
}

export const resolveGuestLocale = (input: {
  country?: string | null
  acceptLanguage?: string | null
}): Locale =>
  localeFromCountry(input.country) ?? localeFromAcceptLanguage(input.acceptLanguage)

export const readLocaleCookie = (cookieHeader: string | null | undefined): Locale | null => {
  if (!cookieHeader) return null
  const match = cookieHeader.match(/(?:^|;\s*)portfolio-locale=(fa|en)(?:;|$)/)
  if (match?.[1] && isLocale(match[1])) return match[1]
  return null
}

export const writeLocaleCookie = (locale: Locale) => {
  if (typeof document === 'undefined') return
  document.cookie = `${LOCALE_STORAGE_KEY}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`
}
