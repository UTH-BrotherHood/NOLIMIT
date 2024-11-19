import Projects from '@/app/dashboard/projects/projects'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Manage your projects and tasks with ease using our project management feature.'
}

export default function ProjectsPage() {
  return <Projects />
}
