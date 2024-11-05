import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import TopLoader from '@/components/top-loader'
import { Provider } from 'react-wrap-balancer'
import AppProvider from '@/components/app-provider'
import { AOSInit } from '@/components/aos'
import { UserProvider } from '@/contexts/profileContext'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: {
    template: '%s | NOLIMIT',
    default: 'NOLIMIT'
  },
  description: "The resource management platform to plan your team's best work"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased overflow-y-auto scrollbar-default  dark:scrollbar-dark `}
      >
        <Provider>
          <AppProvider>
            <UserProvider>
              <TopLoader />
              {children}
              <Toaster />
            </UserProvider>
          </AppProvider>
        </Provider>
      </body>
    </html>
  )
}
