import * as React from 'react'
import { AuthProvider } from './auth-provider'
import { I18nProvider } from './i18n/i18n-provider'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>{children}</AuthProvider>
    </I18nProvider>
  )
}
