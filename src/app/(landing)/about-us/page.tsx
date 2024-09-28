import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our team and our mission.'
}

export default function AboutUsPage() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div>AboutUsPage Page</div>
      <div>Is Updating</div>
    </div>
  )
}
