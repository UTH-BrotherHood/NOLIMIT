import React, { useContext } from 'react'
import { Info, Phone, Video } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ExpandableChatHeader } from '@/components/ui/message/expandable-chat'
import { ConversationType } from '@/schemaValidations/conversation.schema'
import { UserContext } from '@/contexts/profileContext'

interface ChatTopbarProps {
  selectedUser: ConversationType
}

const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }]

const getOtherUserName = (conversationName: Record<string, string>, currentName: string | undefined): string => {
  if (!currentName) return 'Unknown User'

  // Lọc ra người dùng khác bằng cách so sánh với currentName
  const otherUser = Object.entries(conversationName).find(([name]) => name !== currentName)

  return otherUser ? otherUser[1] : 'Unknown User' // Lấy tên của người dùng khác
}

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  const { user } = useContext(UserContext) || {}

  const displayName = selectedUser.is_group
    ? selectedUser.conversation_name // If it's a group, display the group name
    : typeof selectedUser.conversation_name === 'object'
    ? getOtherUserName(selectedUser.conversation_name, user?.username) // If not a group, find the other user's name
    : 'Unknown User' // Fallback for unexpected cases

  return (
    <ExpandableChatHeader>
      <div className='flex items-center gap-2'>
        <div className='flex flex-col'>
          <span className='font-medium'>{String(displayName)}</span>
        </div>
      </div>

      <div className='flex gap-1'>
        {TopbarIcons.map((icon, index) => (
          <Link key={index} href='#' className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9')}>
            <icon.icon size={20} className='text-muted-foreground' />
          </Link>
        ))}
      </div>
    </ExpandableChatHeader>
  )
}
