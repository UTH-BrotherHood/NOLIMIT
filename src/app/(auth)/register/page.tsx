import React from 'react'
import { Metadata } from 'next'
import { RegisterForm } from '@/app/(auth)/register/register-form'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign Up to access the platform'
}

export default function AuthenticationPage() {
  return (
    <>
      <div className='flex flex-col items-center justify-center lg:p-8 h-full'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
            <p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
