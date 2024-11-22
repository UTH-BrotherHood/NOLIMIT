import accountApiRequest from '@/apiRequests/account'
import { useMutation } from '@tanstack/react-query'

export const useGetMeMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.me
  })
}

export const useGetAllConversationsMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.getAllConversations
  })
}
