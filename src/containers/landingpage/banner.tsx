'use client'

import Link from 'next/link'
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
      <Link href={'/dashboard'} className='font-semibold py-2 px-8 rounded-lg text-white bg-primary hover:opacity-80'>
        Try It Now
      </Link>
    </div>
  )
}
