'use client'

import { toast } from '@/hooks/use-toast'
// import { useRouter } from '@/navigation'
import { useSetTokenToCookieMutation } from '@/queries/useAuth'
import { Metadata } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const metadata: Metadata = {
  title: 'Google Login Redirect',
  description: 'Google Login Redirect',
  robots: {
    index: false
  }
}

export default function Oauth() {
  const { mutateAsync } = useSetTokenToCookieMutation()
  const router = useRouter()
  const count = useRef(0)

  const searchParams = useSearchParams()
  const access_token = searchParams.get('access_token')
  const refresh_token = searchParams.get('refresh_token')
  useEffect(() => {
    if (access_token && refresh_token) {
      if (count.current === 0) {
        mutateAsync({ access_token, refresh_token })
          .then(() => {
            router.push('/dashboard')
          })
          .catch((e) => {
            toast({
              description: e.message || 'Có lỗi xảy ra'
            })
          })
        count.current++
      }
    } else {
      if (count.current === 0) {
        setTimeout(() => {
          toast({
            description: 'Có lỗi xảy ra'
          })
        })
        count.current++
      }
    }
  }, [access_token, refresh_token, router, mutateAsync])
  return null
}
