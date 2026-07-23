'use server'

import { AuthError } from 'next-auth'
import { signIn, signOut } from '@/auth'

export type LoginState = {
  error?: string
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin/messages',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password.' }
    }
    throw error
  }

  return {}
}

export async function logoutAction() {
  await signOut({ redirectTo: '/admin/login' })
}
