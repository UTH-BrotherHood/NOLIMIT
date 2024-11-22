import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConversationType } from '@/schemaValidations/conversation.schema'
import useChatStore from '@/hooks/useChatStore'

interface ChatBottombarProps {
  onSendMessage: (message: { message_content: string; message_type: 'text' | 'image' | 'file' }) => void
  isLoading: boolean
  selectedUser: ConversationType
}

export default function ChatBottombar({ onSendMessage, isLoading, selectedUser }: ChatBottombarProps) {
  const { input, setInput } = useChatStore()

  const handleSend = () => {
    if (!input.trim() || isLoading) return

    onSendMessage({
      message_content: input.trim(),
      message_type: 'text'
    })
    setInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='p-4 border-t'>
      <div className='flex gap-2'>
        <Input
          placeholder='Type a message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  )
}
