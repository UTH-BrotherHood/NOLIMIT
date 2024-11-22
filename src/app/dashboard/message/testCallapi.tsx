'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewMessageSchema, NewMessageType } from '@/schemaValidations/message.schema'
import messageApiRequest from '@/apiRequests/message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function TestMessageApi() {
  const [loading, setLoading] = useState(false)
  const form = useForm<NewMessageType>({
    resolver: zodResolver(NewMessageSchema),
    defaultValues: {
      message_content: '',
      message_type: 'text'
    }
  })

  const onSubmit = async (data: NewMessageType) => {
    try {
      setLoading(true)
      // ID conversation test
      const conversationId = '673e265a025cf00638ece1fc'
      const response = await messageApiRequest.newMessage(conversationId, data)
      console.log('Response:', response)
      form.reset()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-md mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>Test Gửi Tin Nhắn</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='message_content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung tin nhắn</FormLabel>
                <Input placeholder='Nhập nội dung tin nhắn...' {...field} disabled={loading} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='message_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại tin nhắn</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn loại tin nhắn' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='text'>Text</SelectItem>
                    <SelectItem value='image'>Image</SelectItem>
                    <SelectItem value='file'>File</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
