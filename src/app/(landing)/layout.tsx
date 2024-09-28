import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/ui/footer'
import { Header } from '@/components/ui/header'
import React from 'react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' forcedTheme='light'>
      <div className='no-scrollbar'>
        <Header />
        <div className='mt-20'>{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
