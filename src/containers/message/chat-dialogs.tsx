import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { WithContext as ReactTags } from 'react-tag-input'

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export function CreateGroupDialog() {
  const [groupName, setGroupName] = useState('')
  const [tags, setTags] = useState<{ id: string; text: string }[]>([])

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag: { id: string; text: string }) => {
    setTags([...tags, tag])
  }

  const handleDrag = (tag: { id: string; text: string }, currPos: number, newPos: number) => {
    const newTags = tags.slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)
    setTags(newTags)
  }

  const handleCreateGroup = () => {
    console.log('Creating group:', groupName)
    console.log(
      'Members:',
      tags.map((tag) => tag.text)
    )
    setGroupName('')
    setTags([])
  }

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogDescription>
          Enter a name for your new group chat and add members by their email addresses.
        </DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='group-name' className='text-right'>
            Group Name
          </Label>
          <Input
            id='group-name'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='members' className='text-right'>
            Members
          </Label>
          <div className='col-span-3'>
            <ReactTags
              tags={tags.map((tag) => ({ ...tag, className: '' }))}
              delimiters={delimiters}
              handleDelete={handleDelete as (tag: any) => void}
              handleAddition={handleAddition as (tag: any) => void}
              handleDrag={handleDrag as (tag: any, currPos: number, newPos: number) => void}
              inputFieldPosition='bottom'
              autocomplete
              placeholder='Add member emails'
              classNames={{
                tags: 'w-full',
                tagInput: 'w-full',
                tagInputField:
                  'w-full mt-1 px-3 py-2 bg-background text-foreground border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring',
                suggestions: 'absolute w-full bg-background border border-input rounded-md mt-1 z-10',
                activeSuggestion: 'bg-accent p-2 cursor-pointer',
                editTagInput: 'w-full',
                editTagInputField: 'w-full',
                clearAll: 'hidden',
                selected: 'flex flex-wrap gap-2 mt-2',
                tag: 'bg-primary text-primary-foreground text-sm rounded px-2 py-1 flex items-center',
                remove: 'ml-2 text-primary-foreground cursor-pointer'
              }}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleCreateGroup}>Create Group</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export function SearchUserDialog() {
  const [email, setEmail] = useState('')

  const handleSearchUser = () => {
    console.log('Searching user:', email)
    setEmail('')
  }

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Search User</DialogTitle>
        <DialogDescription>Enter an email address to find a user.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='email' className='text-right'>
            Email
          </Label>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='col-span-3'
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSearchUser}>Search</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export function SendMessageDialog() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    console.log('Sending message to:', email, 'Message:', message)
    setEmail('')
    setMessage('')
  }

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Send Message</DialogTitle>
        <DialogDescription>Send a message to a user by their email address.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='recipient-email' className='text-right'>
            Recipient Email
          </Label>
          <Input
            id='recipient-email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='message' className='text-right'>
            Message
          </Label>
          <Input id='message' value={message} onChange={(e) => setMessage(e.target.value)} className='col-span-3' />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSendMessage}>Send Message</Button>
      </DialogFooter>
    </DialogContent>
  )
}
