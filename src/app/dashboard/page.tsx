import Dashboard from '@/app/dashboard/dashboard'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard NOLIMIT'
}

export default function DashboardPage() {
  return <Dashboard />
}
