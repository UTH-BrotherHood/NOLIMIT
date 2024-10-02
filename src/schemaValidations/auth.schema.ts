import { AUTH_ERROR_MESSAGE } from '@/constants/errorValidationMessage'
import z, { date } from 'zod'

export const LoginBody = z
  .object({
    email: z.string().min(1, { message: AUTH_ERROR_MESSAGE.EMAIL_REQUIRED }).email({
      message: AUTH_ERROR_MESSAGE.EMAIL_INVALID
    }),
    password: z
      .string()
      .min(6, { message: AUTH_ERROR_MESSAGE.PASSWORD_MIN })
      .max(100, { message: AUTH_ERROR_MESSAGE.PASSWORD_MAX })
  })
  .strict()

export type LoginBodyType = z.infer<typeof LoginBody>

export const LoginRes = z.object({
  message: z.string(),
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string()
  })
})

export type LoginResType = z.TypeOf<typeof LoginRes>

export const RegisterBody = z
  .object({
    name: z.string().min(1, { message: AUTH_ERROR_MESSAGE.NAME_REQUIRED }),
    email: z.string().email({ message: AUTH_ERROR_MESSAGE.EMAIL_INVALID }),
    password: z.string().min(6, { message: AUTH_ERROR_MESSAGE.PASSWORD_MIN }),
    confirm_password: z.string().min(1, { message: AUTH_ERROR_MESSAGE.CONFIRM_PASSWORD_REQUIRED }),
    date_of_birth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format. Expected YYYY-MM-DD' }) // Định dạng ngày tháng năm
      .transform((val) => new Date(val).toISOString().split('T')[0])
  })
  .refine((data) => data.password === data.confirm_password, {
    message: AUTH_ERROR_MESSAGE.CONFIRM_PASSWORD_NOT_MATCH,
    path: ['confirm_password']
  })

export type RegisterBodyType = z.infer<typeof RegisterBody>

export const RegisterRes = z.object({
  message: z.string(),
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string()
  })
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const RefreshTokenBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>

export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  }),
  message: z.string()
})

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>

export const LogoutBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>
