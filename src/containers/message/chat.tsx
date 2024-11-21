import ChatTopbar from './chat-topbar'
import { ChatList } from './chat-list'
import React, { useEffect, useState } from 'react'
import useChatStore from '@/hooks/useChatStore'
import { Message, UserData } from '@/app/dashboard/message/data'

interface ChatProps {
  selectedUser: UserData
  isMobile: boolean
}

export function Chat({ selectedUser, isMobile }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(selectedUser.messages)

  useEffect(() => {
    setMessages(selectedUser.messages)
  }, [selectedUser])

  const sendMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList messages={messages} selectedUser={selectedUser} sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  )
}
