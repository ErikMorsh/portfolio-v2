import { WelcomeBody, WelcomeHeader, WelcomeToolbar } from '@/features/welcome/components'
import '@/features/welcome/styles/welcome.scss'
import { Page } from '@/shared/layout'

export function WelcomeLayout() {
  return (
    <Page className="welcome">
      <WelcomeToolbar />
      <WelcomeHeader />
      <WelcomeBody />
    </Page>
  )
}
