import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/ui/header'
import { Toaster } from '@/components/ui/toaster'
import TopLoader from '@/components/top-loader'
import { Badge } from '@/components/ui/badge'

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <TopLoader />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
