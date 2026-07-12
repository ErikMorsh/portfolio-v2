import type { Locale, LocalizedString } from '@/shared/types'

export const ls = (fa: string, en: string): LocalizedString => ({ fa, en })

export const pickLocale = (text: LocalizedString, locale: Locale): string =>
  text[locale]

export const pickLocaleList = (
  items: LocalizedString[],
  locale: Locale,
): string[] => items.map((item) => pickLocale(item, locale))
