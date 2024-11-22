import http from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'
import { ConversationResponseType } from '@/schemaValidations/conversation.schema'

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
    }),

  getAllConversations: () =>
    http.get<ConversationResponseType>('api/accounts/getAllConversation', {
      baseUrl: ''
    }),

  sGetAllConversations: (access_token: string) =>
    http.get<ConversationResponseType>('/api/v1/conversation', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
}
export default accountApiRequest
