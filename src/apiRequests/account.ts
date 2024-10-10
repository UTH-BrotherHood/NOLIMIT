import http from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'

const accountApiRequest = {
  me: () =>
    http.get<AccountResType>('api/accounts/me', {
      baseUrl: ''
    }),

  sMe: (accessToken: string) =>
    http.get<AccountResType>('/api/v1/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
}
export default accountApiRequest
