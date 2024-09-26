import { Button } from '@/components/ui/button'
import Textarea from 'react-textarea-autosize'
import {
  IconCreditCard,
  IconFileSmile,
  IconMoodSmile,
  IconPaperclip,
  IconPhoto,
  IconSend2,
  IconThumbUpFilled
} from '@tabler/icons-react'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function MessageTypingForm() {
  const [message, setMessage] = useState('')
  const { theme } = useTheme()
  const themeEmojiPicker = theme === 'dark' ? Theme.DARK : Theme.LIGHT

  const [showEmojiPicker, setShowEmojiPicker] = useState(false) // State to manage EmojiPicker visibility
  const emojiPickerRef = useRef<HTMLDivElement>(null) // Ref for EmojiPicker

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev) // Toggle emoji picker visibility
  }

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setMessage((prev) => prev + emojiData.emoji) // Append the selected emoji to the message
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmojiPicker])

  return (
    <form className=''>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex gap-4 px-4 relative'>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='hover:bg-slate-100 dark:hover:bg-neutral-500 rounded-sm p-1'>
                <IconPaperclip className={`h-6 w-6 text-muted-foreground dark:text-gray-100 cursor-pointer `} />
              </div>
            </TooltipTrigger>
            <TooltipContent>Attach a file</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className='hover:bg-slate-100 dark:hover:bg-neutral-500 rounded-sm p-1'>
                <IconPhoto className={`h-6 w-6 text-muted-foreground dark:text-gray-100 cursor-pointer`} />
              </div>
            </TooltipTrigger>
            <TooltipContent>Send a photo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className='hover:bg-slate-100 dark:hover:bg-neutral-500 rounded-sm p-1'>
                <IconFileSmile className={`h-6 w-6 text-muted-foreground dark:text-gray-100 cursor-pointer `} />
              </div>
            </TooltipTrigger>
            <TooltipContent>Send a sticker</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className='hover:bg-slate-100 dark:hover:bg-neutral-500 rounded-sm p-1'>
                <IconCreditCard className={`h-6 w-6 text-muted-foreground dark:text-gray-100 cursor-pointer `} />
              </div>
            </TooltipTrigger>
            <TooltipContent>Send credit card</TooltipContent>
          </Tooltip>

          <div ref={emojiPickerRef}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='hover:bg-slate-100 dark:hover:bg-neutral-500 rounded-sm p-1'>
                  <IconMoodSmile
                    className={`h-6 w-6 text-muted-foreground dark:text-gray-100 cursor-pointer`}
                    onClick={toggleEmojiPicker}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>Choose an emoji</TooltipContent>
            </Tooltip>
          </div>
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className='absolute -top-[30rem] left-44 z-10'>
              <EmojiPicker
                skinTonesDisabled
                allowExpandReactions={false}
                theme={themeEmojiPicker}
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}
        </div>
        <div className='relative flex max-h-60 gap-2 w-full overflow-hidden border-t-2'>
          <Textarea
            tabIndex={0}
            placeholder='Send a message.'
            className='min-h-[40px] mr-[5rem] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm scrollbar-default dark:scrollbar-dark'
            autoFocus
            spellCheck={false}
            autoComplete='off'
            autoCorrect='off'
            name='message'
            rows={1}
            maxRows={6}
            value={message}
            onChange={handleTextareaChange}
          />
          <Button
            onClick={(e: any) => e.preventDefault()}
            size={'lg'}
            className='absolute bottom-2 right-2 bg-transparent shadow-none hover:bg-transparent px-4 py-2 rounded-lg transition'
          >
            {message.trim() ? (
              <IconSend2 className='text-black dark:text-white hover:scale-125 hover:ease-in-out transition-transform duration-200' />
            ) : (
              <IconThumbUpFilled className='text-black dark:text-white hover:scale-125 hover:ease-in-out transition-transform duration-200' />
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
