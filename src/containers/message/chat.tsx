'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import messageApiRequest from '@/apiRequests/message'
import conversationApiRequest from '@/apiRequests/conversation'
import useChatStore from '@/hooks/useChatStore'
import { ChatList } from './chat-list'
import ChatTopbar from './chat-topbar'
import { useNewMessageMutation } from '@/queries/useMessage'

export function Chat() {
  const { conversation_id } = useParams()
  const {
    setMessages,
    selectedConversation,
    setSelectedConversation,
    currentConversationId,
    setCurrentConversationId
  } = useChatStore()
  const createMessageMutation = useNewMessageMutation()
  const queryClient = useQueryClient()

  // Set conversation_id khi component mount
  useEffect(() => {
    if (conversation_id) {
      setCurrentConversationId(conversation_id as string)
    }
  }, [conversation_id, setCurrentConversationId])

  // Query để lấy thông tin conversation
  const { data: conversationData, isLoading: isLoadingConversation } = useQuery({
    queryKey: ['conversation', currentConversationId],
    queryFn: () => conversationApiRequest.getConversationById(currentConversationId as string),
    enabled: !!currentConversationId,
    staleTime: 30000,
    refetchOnWindowFocus: false
  })

  // Query để lấy tin nhắn
  const { data: messagesData, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', currentConversationId],
    queryFn: () => messageApiRequest.getMessages(currentConversationId as string),
    enabled: !!currentConversationId,
    refetchInterval: 1000, // Giảm xuống 1s để cập nhật nhanh hơn
    refetchOnWindowFocus: true
  })

  // Cập nhật selectedConversation khi có dữ liệu conversation
  useEffect(() => {
    if (conversationData?.payload?.data?.[0]) {
      setSelectedConversation(conversationData.payload.data[0])
    }
  }, [conversationData, setSelectedConversation])

  // Cập nhật messages khi có dữ liệu tin nhắn
  useEffect(() => {
    if (messagesData?.payload?.data) {
      setMessages(messagesData.payload.data)
    }
  }, [messagesData, setMessages])

  // Hiển thị loading khi đang tải dữ liệu
  if (isLoadingConversation || isLoadingMessages) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-muted-foreground'>Đang tải...</p>
      </div>
    )
  }

  // Hiển thị lỗi nếu không có conversation
  if (!selectedConversation && !isLoadingConversation) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-muted-foreground'>Không tìm thấy cuộc trò chuyện</p>
      </div>
    )
  }

  const handleSendMessage = async (message: { message_content: string; message_type: 'text' | 'image' | 'file' }) => {
    if (!selectedConversation) return

    try {
      await createMessageMutation.mutateAsync({
        conversationId: selectedConversation._id,
        body: message
      })
      // Invalidate ngay lập tức để fetch tin nhắn mới
      await queryClient.invalidateQueries({ queryKey: ['messages', currentConversationId] })
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <ChatTopbar selectedUser={selectedConversation!} />
      <ChatList selectedUser={selectedConversation!} sendMessage={handleSendMessage} isMobile={false} />
    </div>
  )
}
