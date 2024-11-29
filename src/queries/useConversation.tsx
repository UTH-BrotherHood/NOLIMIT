import conversationApiRequest from '@/apiRequests/conversation'
import { useMutation } from '@tanstack/react-query'

export const useCreatGroupChatMutation = () => {
  return useMutation({
    mutationFn: conversationApiRequest.creatNewGroup
  })
}
