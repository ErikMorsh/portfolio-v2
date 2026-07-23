'use client'

import { useActionState } from 'react'
import { loginAction, type LoginState } from './actions'
import './login-form.scss'

const initialState: LoginState = {}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <form className="login-form" action={formAction}>
      <label className="login-form__field">
        <span>Email</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          disabled={pending}
        />
      </label>
      <label className="login-form__field">
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
        />
      </label>
      {state.error ? <p className="login-form__error">{state.error}</p> : null}
      <button className="login-form__submit" type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
