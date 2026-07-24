import { isRecaptchaEnabled } from './recaptcha-actions'

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const DEFAULT_MIN_SCORE = 0.5

type RecaptchaVerifyResponse = {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

export type RecaptchaVerification =
  | { ok: true; score: number }
  | { ok: false; error: string }

export async function verifyRecaptchaToken(
  token: string,
  options: { minScore?: number; expectedAction: string },
): Promise<RecaptchaVerification> {
  if (!isRecaptchaEnabled()) {
    return { ok: true, score: 1 }
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim()
  if (!secret) {
    console.error('[recaptcha] RECAPTCHA_SECRET_KEY is not configured')
    return { ok: false, error: 'Captcha is not configured.' }
  }

  if (!token.trim()) {
    return { ok: false, error: 'Captcha token is missing.' }
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  let payload: RecaptchaVerifyResponse
  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    payload = (await response.json()) as RecaptchaVerifyResponse
  } catch (error) {
    console.error('[recaptcha] verify request failed', error)
    return { ok: false, error: 'Captcha verification failed.' }
  }

  if (!payload.success) {
    console.warn('[recaptcha] rejected', payload['error-codes'])
    return { ok: false, error: 'Captcha verification failed.' }
  }

  if (payload.action && payload.action !== options.expectedAction) {
    console.warn('[recaptcha] unexpected action', payload.action)
    return { ok: false, error: 'Captcha verification failed.' }
  }

  const minScore = options.minScore ?? DEFAULT_MIN_SCORE
  const score = payload.score ?? 0
  if (score < minScore) {
    console.warn('[recaptcha] low score', score)
    return { ok: false, error: 'Captcha score too low. Please try again.' }
  }

  return { ok: true, score }
}
