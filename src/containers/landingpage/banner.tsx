'use client'

import { Cover } from '@/components/ui/cover'
import Link from 'next/link'
import { ReactTyped } from 'react-typed'
import Balancer from 'react-wrap-balancer'

export default function Banner() {
  return (
    <div className='flex flex-col justify-center items-center pt-32 gap-8 select-none'>
      <h1 className='text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6'>
        <Balancer>
          The resource management platform to plan your{' '}
          <Cover className='bg-gradient bg-clip-text text-transparent'>team's best work</Cover>
        </Balancer>
      </h1>
      <ReactTyped
        className='text-lg text-[#344765] font-semibold text-center font-mono'
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
