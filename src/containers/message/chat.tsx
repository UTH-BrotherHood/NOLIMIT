import ChatTopbar from './chat-topbar'
import { ChatList } from './chat-list'
import React, { useEffect } from 'react'
import useChatStore from '@/hooks/useChatStore'
import { ConversationType } from '@/schemaValidations/conversation.schema'
import { MessageResType } from '@/schemaValidations/message.schema'
import { useNewMessageMutation } from '@/queries/useMessage'
import { useContext } from 'react'
import { UserContext } from '@/contexts/profileContext'
import { useSocket } from '@/hooks/useSocket'

interface ChatProps {
  selectedUser: ConversationType
  isMobile: boolean
  messages: MessageResType[]
}

export function Chat({ selectedUser, isMobile, messages: initialMessages }: ChatProps) {
  const { setMessages, addMessage, setIsLoading, setError } = useChatStore()
  const createMessageMutation = useNewMessageMutation()
  const { user } = useContext(UserContext) || {}
  const socket = useSocket()

  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages, setMessages])

  useEffect(() => {
    if (!socket || !selectedUser) return

    const handleNewMessage = (data: any) => {
      console.log('Socket received data:', data)

      // Kiểm tra xem tin nhắn có thuộc về conversation hiện tại không
      if (data.conversation_id === selectedUser._id) {
        console.log('Message belongs to current conversation')

        // Nếu data.message tồn tại, sử dụng nó, nếu không sử dụng data trực tiếp
        const messageData = data.message || data

        // Tạo tin nhắn mới với format chuẩn
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

        // Thêm tin nhắn vào state
        addMessage(newMessage)
      }
    }

    console.log('Setting up socket listener for conversation:', selectedUser._id)
    socket.on('new_message', handleNewMessage)

    return () => {
      console.log('Cleaning up socket listener')
      socket.off('new_message', handleNewMessage)
    }
  }, [socket, selectedUser, addMessage])

  useEffect(() => {
    if (!socket || !selectedUser?._id) return

    console.log('Joining conversation:', selectedUser._id)
    socket.emit('join_conversation', selectedUser._id)

    return () => {
      if (selectedUser?._id) {
        console.log('Leaving conversation:', selectedUser._id)
        socket.emit('leave_conversation', selectedUser._id)
      }
    }
  }, [socket, selectedUser])

  const sendMessage = async (newMessage: { message_content: string; message_type: 'text' | 'image' | 'file' }) => {
    if (!selectedUser?._id || !user?._id) {
      console.log('Missing required data:', { selectedUser, user })
      return
    }

    try {
      setIsLoading(true)

      // Tạo tin nhắn tạm thời với nội dung gốc
      const tempMessage: MessageResType = {
        _id: Date.now().toString(),
        conversation_id: selectedUser._id,
        message_content: newMessage.message_content,
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

      // Thêm tin nhắn vào UI ngay lập tức
      addMessage(tempMessage)

      // Gửi tin nhắn lên server
      await createMessageMutation.mutateAsync({
        conversationId: selectedUser._id,
        body: newMessage
      })

      // Emit socket event với đầy đủ thông tin
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
