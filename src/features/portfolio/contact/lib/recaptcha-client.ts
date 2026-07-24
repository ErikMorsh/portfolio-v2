import {
  isRecaptchaEnabled,
  RECAPTCHA_ACTIONS,
  type RecaptchaAction,
} from './recaptcha-actions'

export { isRecaptchaEnabled, RECAPTCHA_ACTIONS, type RecaptchaAction }

const SCRIPT_ID = 'google-recaptcha-v3'

type Grecaptcha = {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
  }
}

function getSiteKey() {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? ''
}

function scriptSrc(siteKey: string, locale: string) {
  const hl = locale === 'fa' ? 'fa' : 'en'
  return `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}&hl=${hl}`
}

export function loadRecaptcha(locale = 'en'): Promise<Grecaptcha | null> {
  if (!isRecaptchaEnabled()) {
    return Promise.resolve(null)
  }

  const siteKey = getSiteKey()
  if (!siteKey) {
    return Promise.reject(new Error('RECAPTCHA_SITE_KEY_MISSING'))
  }

  if (typeof window === 'undefined') {
    return Promise.reject(new Error('RECAPTCHA_WINDOW_UNAVAILABLE'))
  }

  if (window.grecaptcha) {
    return Promise.resolve(window.grecaptcha)
  }

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => {
        if (window.grecaptcha) resolve(window.grecaptcha)
        else reject(new Error('RECAPTCHA_LOAD_FAILED'))
      })
      existing.addEventListener('error', () => reject(new Error('RECAPTCHA_LOAD_FAILED')))
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = scriptSrc(siteKey, locale)
    script.async = true
    script.onload = () => {
      if (window.grecaptcha) resolve(window.grecaptcha)
      else reject(new Error('RECAPTCHA_LOAD_FAILED'))
    }
    script.onerror = () => reject(new Error('RECAPTCHA_LOAD_FAILED'))
    document.head.appendChild(script)
  })
}

export async function getRecaptchaToken(
  locale = 'en',
  action: RecaptchaAction = RECAPTCHA_ACTIONS.contact,
): Promise<string> {
  if (!isRecaptchaEnabled()) {
    return ''
  }

  const siteKey = getSiteKey()
  if (!siteKey) {
    throw new Error('RECAPTCHA_SITE_KEY_MISSING')
  }

  const grecaptcha = await loadRecaptcha(locale)
  if (!grecaptcha) {
    return ''
  }

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action })
        .then(resolve)
        .catch(() => reject(new Error('RECAPTCHA_EXECUTE_FAILED')))
    })
  })
}
