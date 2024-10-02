'use client'

import { cn, handleErrorApi } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IconFidgetSpinner } from '@tabler/icons-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { useRegisterMutation } from '@/queries/useAuth'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const registerMutation = useRegisterMutation()
  const router = useRouter()
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      date_of_birth: new Date().toISOString().split('T')[0]
    }
  })

  async function onSubmit(data: RegisterBodyType) {
    if (registerMutation.isPending) return
    try {
      const res = await registerMutation.mutateAsync(data)
      toast({
        description: res.payload.message
      })
      router.push('/dashboard')
    } catch (error: any) {
      console.log('🚀 ~ onSubmit ~ error:', error)
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
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
            <FormField
              control={form.control}
              name='date_of_birth'
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <div className='grid gap-2'>
                    <Label htmlFor='date_of_birth'>Date of Birth</Label>
                    <Input
                      id='date_of_birth'
                      type='date'
                      placeholder='input your date of birth'
                      required
                      // Chuyển đổi giá trị thành chuỗi với định dạng YYYY-MM-DD để hiển thị đúng trong <input type='date'>
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                    <FormMessage>{errors.date_of_birth?.message}</FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              {registerMutation.isPending && <IconFidgetSpinner className='mr-2 h-4 w-4 animate-spin' />}
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
