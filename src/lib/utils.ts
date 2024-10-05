import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { UseFormSetError } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { EntityError } from '@/lib/http'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error && setError && error.payload && error.payload.errors) {
    const errorsObject = error.payload.errors
    Object.entries(errorsObject).forEach(([field, errorDetail]: [string, any]) => {
      // errorDetail chứa thông tin chi tiết về lỗi cho từng trường
      setError(field, {
        type: 'server',
        message: errorDetail.msg // Sử dụng `msg` là thông báo lỗi từ API
      })
    })
  } else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000
    })
  }
}

const isBrowser = typeof window !== 'undefined'

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const getAccessTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem('access_token') : null)

export const getRefreshTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem('refresh_token') : null)

export const setAccessTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem('access_token', value)

export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem('refresh_token', value)

export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('access_token')
  isBrowser && localStorage.removeItem('refresh_token')
}
