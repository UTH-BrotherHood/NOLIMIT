'use client'

import { Button } from '@/components/ui/button'
import { ReactTyped } from 'react-typed'

export default function Banner() {
  return (
    <div className='flex flex-col justify-center items-center pt-32 gap-4'>
      <h1 className='text-5xl font-bold text-center w-[55%]'>
        The resource management platform to plan your team's best work
      </h1>
      <ReactTyped
        className='text-lg text-[#344765] font-medium'
        startWhenVisible
        strings={['Plan, schedule, and track your projects in one place']}
        typeSpeed={40}
      />
      <Button size='lg' className='font-semibold'>
        Try It Now
      </Button>
    </div>
  )
}
