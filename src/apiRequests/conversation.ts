import http from '@/lib/http'
import { ConversationResponseType } from '@/schemaValidations/conversation.schema'

const conversationApiRequest = {
  getAllConversations: () =>
    http.get<ConversationResponseType>('api/conversation/getAllConversation', {
      baseUrl: ''
    }),

  sGetAllConversations: (access_token: string) =>
    http.get<ConversationResponseType>('/api/v1/conversation', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }),

  getConversationById: (conversationId: string) =>
    http.get<ConversationResponseType>(`/api/v1/conversation/${conversationId}`)
}
export default conversationApiRequest
