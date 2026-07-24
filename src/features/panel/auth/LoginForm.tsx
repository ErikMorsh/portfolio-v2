'use client'

import { useActionState, useEffect, useState, useTransition, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  getRecaptchaToken,
  isRecaptchaEnabled,
  loadRecaptcha,
  RECAPTCHA_ACTIONS,
} from '@/features/portfolio/contact/lib/recaptcha-client'
import { loginAction, type LoginState } from './actions'
import './login-form.scss'

const initialState: LoginState = {}

export function LoginForm() {
  const router = useRouter()
  const [state, formAction, actionPending] = useActionState(loginAction, initialState)
  const [captchaPending, startTransition] = useTransition()
  const [captchaError, setCaptchaError] = useState<string | null>(null)
  const captchaEnabled = isRecaptchaEnabled()
  const pending = actionPending || captchaPending

  useEffect(() => {
    if (!captchaEnabled) return
    void loadRecaptcha('en').catch(() => {
      // Script will retry on submit if preload fails
    })
  }, [captchaEnabled])

  useEffect(() => {
    if (!state.ok) return
    router.replace('/admin/messages')
    router.refresh()
  }, [state.ok, router])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCaptchaError(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    if (captchaEnabled) {
      try {
        const token = await getRecaptchaToken('en', RECAPTCHA_ACTIONS.login)
        formData.set('recaptchaToken', token)
      } catch {
        setCaptchaError('Security check failed. Please try again.')
        return
      }
    }

    startTransition(() => {
      formAction(formData)
    })
  }

  const error = captchaError ?? state.error

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="login-form__field">
        <span>Email</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          disabled={pending || Boolean(state.ok)}
        />
      </label>
      <label className="login-form__field">
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending || Boolean(state.ok)}
        />
      </label>
      {error ? <p className="login-form__error">{error}</p> : null}
      <div className="login-form__footer">
        {captchaEnabled ? (
          <p className="login-form__captcha-note">
            Protected by reCAPTCHA.{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy
            </a>
            {' · '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
            >
              Terms
            </a>
          </p>
        ) : (
          <span />
        )}
        <button
          className="login-form__submit"
          type="submit"
          disabled={pending || Boolean(state.ok)}
        >
          {pending || state.ok ? 'Signing in…' : 'Sign in'}
        </button>
      </div>
    </form>
  )
}
