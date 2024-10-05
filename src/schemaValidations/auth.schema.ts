import { AUTH_ERROR_MESSAGE } from '@/constants/errorValidationMessage'
import z from 'zod'

export const SignInBody = z
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

export type SignInBodyType = z.infer<typeof SignInBody>

// export const LoginRes = z.object({
//   data: z.object({
//     accessToken: z.string(),
//     refreshToken: z.string(),
//     account: z.object({
//       id: z.number(),
//       name: z.string(),
//       email: z.string(),
//       role: z.enum([Role.Owner, Role.Employee])
//     })
//   }),
//   message: z.string()
// })

// export type LoginResType = z.TypeOf<typeof LoginRes>

export const SignUpBody = z
  .object({
    name: z.string().min(1, { message: AUTH_ERROR_MESSAGE.NAME_REQUIRED }),
    email: z.string().email({ message: AUTH_ERROR_MESSAGE.EMAIL_INVALID }),
    password: z.string().min(6, { message: AUTH_ERROR_MESSAGE.PASSWORD_MIN }),
    confirm_password: z.string().min(1, { message: AUTH_ERROR_MESSAGE.CONFIRM_PASSWORD_REQUIRED })
  })
  .refine((data) => data.password === data.confirm_password, {
    message: AUTH_ERROR_MESSAGE.CONFIRM_PASSWORD_NOT_MATCH,
    path: ['confirm_password']
  })

export type SignUpBodyType = z.infer<typeof SignUpBody>

// export const RefreshTokenBody = z
//   .object({
//     refreshToken: z.string()
//   })
//   .strict()

// export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>

// export const RefreshTokenRes = z.object({
//   data: z.object({
//     accessToken: z.string(),
//     refreshToken: z.string()
//   }),
//   message: z.string()
// })

// export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>

// export const LogoutBody = z
//   .object({
//     refreshToken: z.string()
//   })
//   .strict()

// export type LogoutBodyType = z.TypeOf<typeof LogoutBody>
export const UpdateProfileBody = z
  .object({
    name: z.string().min(1, { message: AUTH_ERROR_MESSAGE.NAME_REQUIRED }),
    email: z.string().email({ message: AUTH_ERROR_MESSAGE.EMAIL_INVALID }), // Email không thay đổi nhưng vẫn cần để gửi vào API
    password: z.string().min(6, { message: AUTH_ERROR_MESSAGE.PASSWORD_MIN }).optional(), // Mật khẩu là tùy chọn
    confirm_password: z.string().min(1, { message: AUTH_ERROR_MESSAGE.CONFIRM_PASSWORD_REQUIRED }).optional()
  })
  .refine((data) => data.password === data.confirm_password, {
    message: AUTH_ERROR_MESSAGE.CONFIRM_PASSWORD_NOT_MATCH,
    path: ['confirm_password']
  })

export type UpdateProfileBodyType = z.infer<typeof UpdateProfileBody>