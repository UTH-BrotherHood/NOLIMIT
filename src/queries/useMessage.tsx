import accountApiRequest from '@/apiRequests/account'
import messageApiRequest from '@/apiRequests/message'
import { NewMessageType } from '@/schemaValidations/message.schema'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetAllConversationsMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.getAllConversations
  })
}

export const useGetAllMessagesMutation = () => {
  return useMutation({
    mutationFn: messageApiRequest.getMessages
  })
}

export const useNewMessageMutation = () => {
  return useMutation({
    mutationFn: (params: { conversationId: string; body: NewMessageType }) =>
      messageApiRequest.newMessage(params.conversationId, params.body)
  })
}
