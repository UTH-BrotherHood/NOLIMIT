'use client'

import Link from 'next/link'
import { MoreHorizontal, SquarePen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ConversationType } from '@/schemaValidations/conversation.schema'
import { useContext } from 'react'
import { UserContext } from '@/contexts/profileContext'

interface SidebarProps {
  isCollapsed: boolean
  chats: {
    id: string
    name: string | Record<string, string>
    variant: 'secondary' | 'ghost'
    is_group: boolean
    currentUserId?: string
  }[]
  onUserSelect: (conversation: ConversationType) => void
  isMobile: boolean
  selectedUserId?: string
}

// Thêm hàm helper để lấy tên người dùng còn lại
const getOtherUserName = (conversationName: Record<string, string>, currentUserId: string | undefined) => {
  if (!currentUserId) return ''
  const otherUser = Object.entries(conversationName).find(([id]) => id !== currentUserId)
  return otherUser ? otherUser[1] : ''
}

export function Sidebar({ chats, isCollapsed, isMobile, onUserSelect }: SidebarProps) {
  const { user } = useContext(UserContext) || {}
  return (
    <div
      data-collapsed={isCollapsed}
      className='relative group flex flex-col h-full bg-muted/10 dark:bg-muted/20 gap-4 p-2 data-[collapsed=true]:p-2 '
    >
      {!isCollapsed && (
        <div className='flex justify-between p-2 items-center'>
          <div className='flex gap-2 items-center text-2xl'>
            <p className='font-medium'>Chats</p>
            <span className='text-zinc-300'>({chats.length})</span>
          </div>

          <div>
            <Link href='#' className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9')}>
              <MoreHorizontal size={20} />
            </Link>

            <Link href='#' className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9')}>
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}
      <nav className=' grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {chats.map((chat) =>
          isCollapsed ? (
            <TooltipProvider key={chat.id}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href='#'
                    className={cn(
                      buttonVariants({ variant: chat.variant, size: 'icon' }),
                      'h-11 w-11 md:h-16 md:w-16 relative',
                      chat.variant === 'secondary' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                    )}
                    onClick={() =>
                      onUserSelect({
                        _id: chat.id,
                        conversation_name: chat.name,
                        is_group: chat.is_group,
                        creator: chat.currentUserId || '',
                        created_at: '',
                        updated_at: '',
                        role: 'member'
                      })
                    }
                  >
                    <Avatar className='flex justify-center items-center'>
                      <AvatarImage
                        src={
                          'https://static.minhtuanmobile.com/uploads/editer/images/truyen-cam-hung-voi-hinh-nen-chu-chuot-dau-bep-17.webp'
                        }
                        alt='avatar'
                        className='w-10 h-10'
                      />
                    </Avatar>
                    {chat.is_group && (
                      <div className='absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1'>
                        Group
                      </div>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right' className='flex items-center gap-4'>
                  {chat.is_group
                    ? typeof chat.name === 'string'
                      ? chat.name
                      : 'Unnamed Group'
                    : typeof chat.name === 'object'
                    ? getOtherUserName(chat.name, user?._id)
                    : chat.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={chat.id}
              href='#'
              className={cn(
                buttonVariants({ variant: chat.variant, size: 'lg' }),
                chat.variant === 'secondary' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
                'justify-start gap-4 relative'
              )}
              onClick={() =>
                onUserSelect({
                  _id: chat.id,
                  conversation_name: chat.name,
                  is_group: chat.is_group,
                  creator: chat.currentUserId || '',
                  created_at: '',
                  updated_at: '',
                  role: 'member'
                })
              }
            >
              <Avatar className='flex justify-center items-center'>
                <AvatarImage
                  src='https://static.minhtuanmobile.com/uploads/editer/images/truyen-cam-hung-voi-hinh-nen-chu-chuot-dau-bep-17.webp'
                  alt='avatar'
                  className='w-10 h-10'
                />
              </Avatar>
              <div className='flex flex-col max-w-28'>
                <div className='flex items-center gap-2'>
                  <span>
                    {chat.is_group
                      ? typeof chat.name === 'string'
                        ? chat.name
                        : 'Unnamed Group'
                      : typeof chat.name === 'object'
                      ? getOtherUserName(chat.name, user?._id)
                      : chat.name}
                  </span>
                  {chat.is_group && <span className='bg-primary text-white text-xs rounded-full px-1'>Group</span>}
                </div>
              </div>
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
