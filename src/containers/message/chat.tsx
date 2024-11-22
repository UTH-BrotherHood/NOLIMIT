import ChatTopbar from './chat-topbar'
import { ChatList } from './chat-list'
import React, { useEffect } from 'react'
import useChatStore from '@/hooks/useChatStore'
import { ConversationType } from '@/schemaValidations/conversation.schema'
import { MessageResType } from '@/schemaValidations/message.schema'
import { useNewMessageMutation } from '@/queries/useMessage'
import { useContext } from 'react'
import { UserContext } from '@/contexts/profileContext'

interface ChatProps {
  selectedUser: ConversationType
  isMobile: boolean
  messages: MessageResType[]
}

export function Chat({ selectedUser, isMobile, messages: initialMessages }: ChatProps) {
  const { setMessages, addMessage, setIsLoading, setError } = useChatStore()
  const createMessageMutation = useNewMessageMutation()
  const { user } = useContext(UserContext) || {}

  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages, setMessages])

  const sendMessage = async (newMessage: { message_content: string; message_type: 'text' | 'image' | 'file' }) => {
    if (!selectedUser?._id || !user?._id) return

    try {
      setIsLoading(true)

      // Thêm tin nhắn vào UI ngay lập tức với nội dung gốc
      const tempMessage: MessageResType = {
        _id: Date.now().toString(), // ID tạm thời
        conversation_id: selectedUser._id,
        message_content: newMessage.message_content, // Nội dung gốc
        message_type: newMessage.message_type,
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

      addMessage(tempMessage)

      // Gửi tin nhắn lên server
      await createMessageMutation.mutateAsync({
        conversationId: selectedUser._id,
        body: newMessage
      })
    } catch (error) {
      console.error('Error sending message:', error)
      setError('Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  if (!selectedUser) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-muted-foreground'>Select a conversation to start chatting</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList selectedUser={selectedUser} sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  )
}
