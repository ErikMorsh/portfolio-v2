import { auth } from '@/auth'
import { LoginForm } from '@/features/panel/auth/LoginForm'
import '@/features/panel/auth/login-form.scss'
import { redirect } from 'next/navigation'

export default async function AdminLoginPage() {
  const session = await auth()
  if (session?.user) {
    redirect('/admin/messages')
  }

  return (
    <div className="login-page">
      <div className="login-page__card">
        <h1 className="login-page__title">Admin login</h1>
        <p className="login-page__subtitle">Sign in to manage contact messages.</p>
        <LoginForm />
      </div>
    </div>
  )
}
