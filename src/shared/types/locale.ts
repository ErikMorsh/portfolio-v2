export type Locale = 'fa' | 'en'

export type LocalizedString = Record<Locale, string>

export const isLocale = (value: string): value is Locale =>
  value === 'fa' || value === 'en'
