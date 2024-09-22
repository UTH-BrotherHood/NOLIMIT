'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IconBrandGoogleFilled, IconFidgetSpinner } from '@tabler/icons-react'
import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpBody, SignUpBodyType } from '@/schemaValidations/auth.schema'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const form = useForm<SignUpBodyType>({
    resolver: zodResolver(SignUpBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(data: SignUpBodyType) {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form
          className='space-y-2 max-w-[400px] flex-shrink-0 w-full'
          noValidate
          onSubmit={form.handleSubmit(onSubmit, (err) => {
            console.log(err)
          })}
        >
          <div className='grid gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' type='text' placeholder='input your name' required {...field} />
                    <FormMessage>{Boolean(errors.email?.message)}</FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' type='email' placeholder='input your email' required {...field} />
                    <FormMessage>{Boolean(errors.email?.message)}</FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <Label htmlFor='password'>Password</Label>
                      <Input id='password' type='password' placeholder='password' required {...field} />
                      <FormMessage>{Boolean(errors.password?.message)}</FormMessage>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirm_password'
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <Label htmlFor='confirm_password'>Password Confirmation</Label>
                      <Input id='confirm_password' type='password' placeholder='confirm password' required {...field} />
                      <FormMessage>{Boolean(errors.password?.message)}</FormMessage>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              {isLoading && <IconFidgetSpinner className='mr-2 h-4 w-4 animate-spin' />}
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      <p className='text-center text-sm text-muted-foreground'>
        Already have an account?{' '}
        <Link className='underline' href='/sign-in'>
          Sign In
        </Link>
      </p>
    </div>
  )
}
