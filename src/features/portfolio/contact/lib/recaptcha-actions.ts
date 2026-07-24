export const RECAPTCHA_ACTIONS = {
  contact: 'contact',
  login: 'admin_login',
} as const

export type RecaptchaAction =
  (typeof RECAPTCHA_ACTIONS)[keyof typeof RECAPTCHA_ACTIONS]

/** Client + server: set NEXT_PUBLIC_RECAPTCHA_ENABLED=true only on real/deployed hosts. */
export function isRecaptchaEnabled() {
  return process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === 'true'
}
