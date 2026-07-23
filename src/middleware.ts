import { NextResponse, type NextRequest } from 'next/server'
import {
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_STORAGE_KEY,
  resolveGuestLocale,
} from '@/i18n/config/locale-preference'
import { isLocale } from '@/shared/types'

export function middleware(request: NextRequest) {
  const existing = request.cookies.get(LOCALE_STORAGE_KEY)?.value
  if (existing && isLocale(existing)) {
    return NextResponse.next()
  }

  const country =
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry')

  const locale = resolveGuestLocale({
    country,
    acceptLanguage: request.headers.get('accept-language'),
  })

  const response = NextResponse.next()
  response.cookies.set(LOCALE_STORAGE_KEY, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
