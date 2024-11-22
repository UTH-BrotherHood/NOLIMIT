'use client'

import React, { useContext, useEffect, useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
import { Chat } from './chat'
import { useGetAllConversationsMutation } from '@/queries/useMessage'
import { useGetAllMessagesMutation } from '@/queries/useMessage'
import { ConversationType } from '@/schemaValidations/conversation.schema'
import { UserContext } from '@/contexts/profileContext'
import { MessageResType, MessageType } from '@/schemaValidations/message.schema'
import { Sidebar } from '@/containers/message/sidebar-message'

interface ChatLayoutProps {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize
}: ChatLayoutProps) {
  const conversationsMutation = useGetAllConversationsMutation()
  const messagesMutation = useGetAllMessagesMutation()
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [selectedConversation, setSelectedConversation] = React.useState<ConversationType | undefined>(undefined)
  const [conversations, setConversations] = React.useState<ConversationType[]>([])
  const [messages, setMessages] = React.useState<MessageResType[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const { user } = useContext(UserContext) || {}

  const handleConversationSelect = async (conversation: ConversationType) => {
    setSelectedConversation(conversation)
    try {
      const response = await messagesMutation.mutateAsync(conversation._id)
      if (response.payload?.data) {
        setMessages(response.payload.data as MessageResType[])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await conversationsMutation.mutateAsync()
      setConversations(res.payload.data)
    }
    fetchConversations()
  }, [])

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenWidth()
    window.addEventListener('resize', checkScreenWidth)

    return () => {
      window.removeEventListener('resize', checkScreenWidth)
    }
  }, [])

  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
      }}
      className='h-full items-stretch'
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
        }}
        onExpand={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
        }}
        className={cn(isCollapsed && 'min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out')}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          chats={conversations.map((conversation) => ({
            id: conversation._id,
            name: conversation.conversation_name,
            variant: selectedConversation?._id === conversation._id ? 'secondary' : 'ghost',
            is_group: conversation.is_group,
            currentUserId: user?._id
          }))}
          isMobile={isMobile}
          onUserSelect={handleConversationSelect}
          selectedUserId={selectedConversation?._id}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat selectedUser={selectedConversation!} isMobile={isMobile} messages={messages} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
