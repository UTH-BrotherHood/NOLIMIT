'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Cover } from '@/components/ui/cover'
import HyperText from '@/components/ui/hyper-text'
import Link from 'next/link'
import { ReactTyped } from 'react-typed'
import Balancer from 'react-wrap-balancer'

export default function Banner() {
  return (
    <div className='relative flex flex-col justify-center items-center pt-10 lg:pt-24 xl:pt-32 gap-8 select-none'>
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
      <Link href={'/dashboard'}>
        <Button size='lg' className='hidden lg:block bg-black text-white font-semibold z-10'>
          <HyperText text='Try It Now' />
        </Button>
      </Link>
      <Button
        disabled
        className='block lg:hidden cursor-not-allowed font-semibold py-2 px-8 rounded-lg text-white bg-primary hover:opacity-80'
      >
        Try It Now
      </Button>
      <div className='text-center lg:hidden'>
        <Badge>Mobile currently unavailable</Badge>
        <div>Please open this page on desktop</div>
      </div>
    </div>
  )
}
