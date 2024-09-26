import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Mail } from '@/app/dashboard/message/data'
import MessageTypingForm from '@/containers/message/message-typing-form'
import { IconInfoCircle, IconPhone, IconPhoneFilled, IconVideo } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center'></div>
      <Separator />
      {mail ? (
        <div className='flex flex-1 flex-col'>
          <div className='flex items-start p-4 '>
            <div className='flex items-start gap-4 text-sm '>
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(' ')
                    .map((chunk: any) => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <div className='font-semibold'>{mail.name}</div>
                <div className='line-clamp-1 text-xs'>{mail.subject}</div>
              </div>
            </div>
            <div className='ml-auto text-xs mr-2'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={'ghost'} size={'icon'}>
                    <IconPhone />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start a voice call</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={'ghost'} size={'icon'}>
                    <IconVideo />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start a video call</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={'ghost'} size={'icon'}>
                    <IconInfoCircle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Conversation infomation</TooltipContent>
              </Tooltip>
            </div>

            {/* {mail.date && (
              <div className='ml-auto text-xs text-muted-foreground'>{format(new Date(mail.date), 'PPpp')}</div>
            )} */}
          </div>
          <Separator />
          {/* <div className='flex-1 whitespace-pre-wrap p-4 text-sm'>{mail.text}</div> */}
          <div className='flex flex-col gap-4 p-4'>
            <div className='flex items-start gap-4 w-[45%]'>
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(' ')
                    .map((chunk: any) => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 p-2 bg-gray-100 rounded-lg'>
                <div className='text-sm'>{mail.text}</div>
              </div>
            </div>
            <div className='flex items-start gap-4 self-end  w-[45%] '>
              <div className='flex-1 p-2 bg-blue-100 rounded-lg'>
                <div className='text-sm'>
                  Thanks for reaching out! I’ll be ready for tomorrow’s meeting and will come prepared with any
                  questions. Looking forward to hearing your ideas and discussing the next steps!
                </div>
              </div>
              <Avatar>
                <AvatarImage alt='You' />
                <AvatarFallback>V</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <Separator className='mt-auto' />
          <div className='py-4'>
            <MessageTypingForm />
          </div>
        </div>
      ) : (
        <div className='p-8 text-center text-muted-foreground'>No message selected</div>
      )}
    </div>
  )
}
