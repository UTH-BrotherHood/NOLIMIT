'use client'

import { cn, handleErrorApi } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IconBrandGoogleFilled, IconFidgetSpinner } from '@tabler/icons-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { useLoginMutation } from '@/queries/useAuth'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { UserContext } from '@/contexts/profileContext'
import { useGetMeMutation } from '@/queries/useAccount'
import envConfig from '@/config'

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInFormProps) {
  const loginMutation = useLoginMutation()
  const me = useGetMeMutation()

  const { setUser } = useContext(UserContext) || {}

  const router = useRouter()

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginBodyType) => {
    // Khi nhấn submit thì React hook form sẽ validate cái form bằng zod schema ở client trước
    // Nếu không pass qua vòng này thì sẽ không gọi api
    if (loginMutation.isPending) return
    try {
      const res = await loginMutation.mutateAsync(data)

      const response = await me.mutateAsync()
      toast({
        description: res.payload.message
      })
      setUser?.(response.payload.data)
      router.push('/dashboard')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.payload?.message ?? 'Error unknown',
        variant: 'destructive'
      })
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  const handleGoogleSignIn = () => {
    router.push(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/v1/user/google`)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form
          className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
          noValidate
          onSubmit={form.handleSubmit(onSubmit, (err) => {
            console.log(err)
          })}
        >
          <div className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='name@example.com'
                      required
                      {...field}
                      autoCapitalize='none'
                      autoComplete='off'
                      autoCorrect='off'
                      disabled={loginMutation.isPending}
                    />
                    <FormMessage>{Boolean(errors.email?.message)}</FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <div className='grid gap-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      id='password'
                      type='password'
                      placeholder='password'
                      required
                      {...field}
                      autoCapitalize='none'
                      autoComplete='off'
                      autoCorrect='off'
                      disabled={loginMutation.isPending}
                    />
                    <FormMessage>{Boolean(errors.password?.message)}</FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              {loginMutation.isPending && <IconFidgetSpinner className='mr-2 h-4 w-4 animate-spin' />}
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>
      <Button variant='outline' type='button' disabled={loginMutation.isPending} onClick={handleGoogleSignIn}>
        {loginMutation.isPending ? (
          <IconFidgetSpinner className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <IconBrandGoogleFilled className='mr-2 h-4 w-4' />
        )}{' '}
        Sign in with Google
      </Button>
      <p className='text-center text-sm text-muted-foreground'>
        Don't have an account?{' '}
        <Link className='underline' href='/register'>
          Sign up
        </Link>
      </p>
    </div>
  )
}
