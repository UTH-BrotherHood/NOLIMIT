import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard NOLIMIT'
}

export default function DashboardPage() {
  return (
    <div className='flex flex-col justify-center items-center h-[100rem]'>
      <div>Dashboard Page</div>
      <div>Is Updating</div>
    </div>
  )
}
