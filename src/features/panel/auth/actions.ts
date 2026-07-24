'use server'

import { AuthError } from 'next-auth'
import { signIn, signOut } from '@/auth'
import { RECAPTCHA_ACTIONS } from '@/features/portfolio/contact/lib/recaptcha-actions'
import { verifyRecaptchaToken } from '@/features/portfolio/contact/lib/verify-recaptcha'

export type LoginState = {
  error?: string
  ok?: boolean
}

function isSignInErrorUrl(url: unknown) {
  if (typeof url !== 'string') return false
  return (
    url.includes('error=') ||
    url.includes('code=credentials') ||
    url.includes('/api/auth/signin')
  )
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const recaptchaToken = String(formData.get('recaptchaToken') ?? '')

  const captcha = await verifyRecaptchaToken(recaptchaToken, {
    expectedAction: RECAPTCHA_ACTIONS.login,
  })
  if (!captcha.ok) {
    return { error: 'Security check failed. Please try again.' }
  }

  try {
    // Avoid redirect() inside useActionState — it throws and can leave the
    // App Router with a mismatched hooks count on the next render.
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (isSignInErrorUrl(result)) {
      return { error: 'Invalid email or password.' }
    }

    return { ok: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password.' }
    }
    throw error
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: '/admin/login' })
}
