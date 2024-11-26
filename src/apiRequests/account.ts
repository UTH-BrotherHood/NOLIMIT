import http from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'

const accountApiRequest = {
  me: () =>
    http.get<AccountResType>('api/accounts/me', {
      baseUrl: ''
    }),

  sMe: (access_token: string) =>
    http.get<AccountResType>('/api/v1/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
}
export default accountApiRequest
