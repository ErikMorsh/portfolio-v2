import NextAuth from 'next-auth'
import {
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_STORAGE_KEY,
  resolveGuestLocale,
} from '@/i18n/config/locale-preference'
import { isLocale } from '@/shared/types'
import { NextResponse } from 'next/server'
import { authConfig } from './auth.config'

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname.startsWith('/admin/login')
  const isAuthenticated = !!request.auth

  if (isAdminRoute && !isLoginRoute && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/messages', request.nextUrl.origin))
  }

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
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
