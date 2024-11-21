import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import TextareaAutosize from 'react-textarea-autosize'

interface ChatInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(({ className, ...props }, ref) => (
  <TextareaAutosize
    maxRows={5}
    minRows={1}
    placeholder='Type a message...'
    ref={ref}
    className={cn(
      'border p-5 bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-full flex items-center h-16 resize-none',
      className
    )}
  />
))
ChatInput.displayName = 'ChatInput'

export { ChatInput }
