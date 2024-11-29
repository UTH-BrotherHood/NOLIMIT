'use client'

import { useParams } from 'next/navigation'
import { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import messageApiRequest from '@/apiRequests/message'
import conversationApiRequest from '@/apiRequests/conversation'
import useChatStore from '@/hooks/useChatStore'
import { ChatList } from './chat-list'
import ChatTopbar from './chat-topbar'
import { useNewMessageMutation } from '@/queries/useMessage'
import { useSocket } from '@/hooks/useSocket'
import { UserContext } from '@/contexts/profileContext'
import { MessageResType } from '@/schemaValidations/message.schema'
import { Loader2 } from 'lucide-react'

export function Chat() {
  const { conversation_id } = useParams()
  const {
    setMessages,
    addMessage,
    selectedConversation,
    setSelectedConversation,
    currentConversationId,
    setCurrentConversationId,
    setIsLoading,
    setError
  } = useChatStore()
  const createMessageMutation = useNewMessageMutation()
  const socket = useSocket()
  const { user } = useContext(UserContext) || {}

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
    enabled: !!currentConversationId && !selectedConversation,
    staleTime: 30000,
    refetchOnWindowFocus: false
  })

  // Query để lấy tin nhắn ban đầu
  const { data: messagesData, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', currentConversationId],
    queryFn: () => messageApiRequest.getMessages(currentConversationId as string),
    enabled: !!currentConversationId,
    staleTime: Infinity, // Không tự động fetch lại
    refetchOnWindowFocus: false
  })

  // Cập nhật selectedConversation khi có dữ liệu conversation
  useEffect(() => {
    if (conversationData?.payload?.data?.[0]) {
      setSelectedConversation(conversationData.payload.data[0])
    }
  }, [conversationData, setSelectedConversation])

  // Cập nhật messages ban đầu
  useEffect(() => {
    if (messagesData?.payload?.data) {
      setMessages(messagesData.payload.data)
    }
  }, [messagesData?.payload?.data, setMessages])

  // Xử lý socket events
  useEffect(() => {
    if (!socket || !selectedConversation) return

    const handleNewMessage = (data: any) => {
      console.log('Socket received data:', data)

      if (data.conversation_id === selectedConversation._id) {
        console.log('Message belongs to current conversation')

        const messageData = data.message || data

        const newMessage: MessageResType = {
          _id: messageData._id || Date.now().toString(),
          conversation_id: messageData.conversation_id,
          message_content: messageData.message_content,
          message_type: messageData.message_type || 'text',
          sender: messageData.sender || {
            _id: messageData.sender_id,
            username: messageData.sender_username || '',
            email: messageData.sender_email || '',
            avatar_url: messageData.sender_avatar_url || ''
          },
          is_read: false,
          read_by_users: [],
          created_at: messageData.created_at || new Date().toISOString(),
          updated_at: messageData.updated_at || new Date().toISOString()
        }

        console.log('Formatted new message:', newMessage)
        addMessage(newMessage)
      }
    }

    console.log('Setting up socket listener for conversation:', selectedConversation._id)
    socket.emit('join_conversation', selectedConversation._id)
    socket.on('new_message', handleNewMessage)

    return () => {
      console.log('Cleaning up socket listener')
      socket.emit('leave_conversation', selectedConversation._id)
      socket.off('new_message', handleNewMessage)
    }
  }, [socket, selectedConversation, addMessage])

  const handleSendMessage = async (message: { message_content: string; message_type: 'text' | 'image' | 'file' }) => {
    if (!selectedConversation || !user?._id) return

    try {
      setIsLoading(true)

      // Tạo tin nhắn tạm thời
      const tempMessage: MessageResType = {
        _id: Date.now().toString(),
        conversation_id: selectedConversation._id,
        message_content: message.message_content,
        message_type: message.message_type,
        sender: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar_url: user.avatar_url || ''
        },
        is_read: false,
        read_by_users: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Thêm tin nhắn vào UI ngay lập tức
      addMessage(tempMessage)

      // Gửi tin nhắn lên server
      await createMessageMutation.mutateAsync({
        conversationId: selectedConversation._id,
        body: message
      })

      // Emit socket event
      if (socket) {
        console.log('Emitting socket message:', tempMessage)
        socket.emit('send_message', {
          ...tempMessage,
          sender_id: user._id,
          sender_username: user.username,
          sender_email: user.email,
          sender_avatar_url: user.avatar_url
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setError('Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingConversation || isLoadingMessages) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='w-4 h-4 animate-spin' />
      </div>
    )
  }

  if (!selectedConversation) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-muted-foreground'>Không tìm thấy cuộc trò chuyện</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full'>
      <ChatTopbar selectedUser={selectedConversation} />
      <ChatList selectedUser={selectedConversation} sendMessage={handleSendMessage} isMobile={false} />
    </div>
  )
}
