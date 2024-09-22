import { Header } from '@/components/ui/header'
import React from 'react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
