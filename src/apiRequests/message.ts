import http from '@/lib/http'
import { NewMessageType, NewMessageResponseType, MessageResponseType } from '@/schemaValidations/message.schema'

const messageApiRequest = {
  newMessage: (conversationId: string, body: NewMessageType) =>
    http.post<NewMessageResponseType>(`/api/v1/conversation/${conversationId}/messages`, body),

  getMessages: (conversationId: string) =>
    http.get<MessageResponseType>(`/api/v1/conversation/${conversationId}/messages`)
}
export default messageApiRequest
