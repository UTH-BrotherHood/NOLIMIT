import http from '@/lib/http'
import { NewMessageType, NewMessageResponseType } from '@/schemaValidations/message.schema'

const messageApiRequest = {
  newMessage: (conversationId: string, body: NewMessageType) =>
    http.post<NewMessageResponseType>(`/api/v1/conversation/${conversationId}/messages`, body)
}

export default messageApiRequest
