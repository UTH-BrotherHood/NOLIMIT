import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/ui/header'
import React from 'react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ThemeProvider attribute='class' defaultTheme='light' forcedTheme='light'>
        <Header />
        {children}
      </ThemeProvider>
    </div>
  )
}
