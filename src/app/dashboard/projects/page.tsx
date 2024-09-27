import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Manage your projects and tasks with ease using our project management feature.'
}

export default function ProjectsPage() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div>Projects Page</div>
      <div>Is Updating</div>
    </div>
  )
}
