'use client'

import { useGetAllConversationsMutation, useGetAllMessagesMutation, useNewMessageMutation } from '@/queries/useMessage'
import { useEffect, useState } from 'react'
import { useSocket } from '@/hooks/useSocket'

export default function TestCallAPI() {
  const socket = useSocket()
  const [messages, setMessages] = useState<any[]>([])
  const [conversations, setConversations] = useState<any[]>([])
  const [currentConversationId, setCurrentConversationId] = useState('')

  const getAllConversationsMutation = useGetAllConversationsMutation()
  const getAllMessagesMutation = useGetAllMessagesMutation()
  const newMessageMutation = useNewMessageMutation()

  // Fetch conversations
  const handleGetConversations = async () => {
    try {
      const response = await getAllConversationsMutation.mutateAsync()
      setConversations(response.payload.data)
      if (response.payload.data.length > 0) {
        setCurrentConversationId(response.payload.data[0]._id)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    }
  }

  // Fetch messages for a conversation
  const handleGetMessages = async (conversationId: string) => {
    try {
      const response = await getAllMessagesMutation.mutateAsync(conversationId)
      setMessages(response.payload.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  // Send new message
  const handleSendMessage = async () => {
    if (!currentConversationId) return

    try {
      await newMessageMutation.mutateAsync({
        conversationId: currentConversationId,
        body: {
          message_content: 'Test message ' + new Date().toISOString(),
          message_type: 'text'
        }
      })

      // Refresh messages after sending
      handleGetMessages(currentConversationId)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  // Socket listeners
  useEffect(() => {
    if (!socket) return

    socket.on('new_message', (message) => {
      console.log('New message received:', message)
      setMessages((prev) => [...prev, message])
    })

    socket.on('user_status', (data) => {
      console.log('User status update:', data)
    })

    return () => {
      socket.off('new_message')
      socket.off('user_status')
    }
  }, [socket])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Test API Calls</h1>

      <div className='space-y-4'>
        <div>
          <button onClick={handleGetConversations} className='bg-blue-500 text-white px-4 py-2 rounded'>
            Get Conversations
          </button>
          <div className='mt-2'>
            {conversations.map((conv) => (
              <div key={conv._id} className='p-2 border rounded mb-2'>
                <p>ID: {conv._id}</p>
                <p>
                  Users: {conv.user1Email} - {conv.user2Email}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => currentConversationId && handleGetMessages(currentConversationId)}
            className='bg-green-500 text-white px-4 py-2 rounded'
          >
            Get Messages
          </button>
          <div className='mt-2'>
            {messages.map((msg) => (
              <div key={msg._id} className='p-2 border rounded mb-2'>
                <p>Content: {msg.content}</p>
                <p>From: {msg.senderId}</p>
                <p>Time: {new Date(msg.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button onClick={handleSendMessage} className='bg-purple-500 text-white px-4 py-2 rounded'>
            Send Test Message
          </button>
        </div>
      </div>
    </div>
  )
}
