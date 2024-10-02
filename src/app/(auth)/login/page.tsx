import { SignInForm } from '@/app/(auth)/login/login-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to access the platform'
}

export default function AuthenticationPage() {
  return (
    <>
      <div className='flex flex-col items-center justify-center lg:p-8 h-full'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign in to your account</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email and password below to sign in to your account
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </>
  )
}
