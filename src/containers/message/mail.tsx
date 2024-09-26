'use client'

import * as React from 'react'
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MailDisplay } from '@/containers/message/mail-display'
import { MailList } from '@/containers/message/mail-list'
import { type Mail } from '@/app/dashboard/message/data'
import { useMail } from '@/hooks/use-mail'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: Mail[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [20, 75],
  defaultCollapsed = false,
  navCollapsedSize
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [mail] = useMail()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup direction='horizontal' className='h-full items-stretch'>
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40} collapsedSize={navCollapsedSize} collapsible={true}>
          <Separator />
          <Tabs defaultValue='all'>
            <div className='flex items-center px-4 py-2'>
              <h1 className='text-xl font-bold'>Inbox</h1>
              <TabsList className='ml-auto'>
                <TabsTrigger value='all' className='text-zinc-600 dark:text-zinc-200'>
                  All mail
                </TabsTrigger>
                <TabsTrigger value='unread' className='text-zinc-600 dark:text-zinc-200'>
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className='p-4 backdrop-blur '>
              <form>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input placeholder='Search' className='pl-8' />
                </div>
              </form>
            </div>
            <Separator />
            <Separator />
            <TabsContent value='all' className='mt-1'>
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value='unread' className='mt-1'>
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} maxSize={75}>
          <MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
