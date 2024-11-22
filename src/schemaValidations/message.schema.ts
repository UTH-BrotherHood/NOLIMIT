import { z } from 'zod'

// Enum cho message type
export const MessageType = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file'
} as const

// Schema cho sender
export const SenderSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar_url: z.string()
})

export type SenderType = z.infer<typeof SenderSchema>

// Schema cho new message request body
export const NewMessageSchema = z.object({
  message_content: z.string().min(1, 'Message content is required'),
  message_type: z.enum([MessageType.TEXT, MessageType.IMAGE, MessageType.FILE])
})

// Type cho new message
export type NewMessageType = z.infer<typeof NewMessageSchema>

// Schema cho message response từ API
export const MessageSchema = z.object({
  _id: z.string(),
  conversation_id: z.string(),
  message_content: z.string(),
  message_type: z.enum([MessageType.TEXT, MessageType.IMAGE, MessageType.FILE]),
  is_read: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  sender: SenderSchema,
  read_by_users: z.array(z.string())
})

// Type cho message
export type MessageType = z.infer<typeof MessageSchema>

// Schema cho response API khi get messages
export const MessageResponseSchema = z.object({
  message: z.string(),
  data: z.array(MessageSchema)
})

export type MessageResponseType = z.infer<typeof MessageResponseSchema>

// Schema cho response API khi tạo message mới
export const NewMessageResponseSchema = z.object({
  message: z.string(),
  data: MessageSchema
})

export type NewMessageResponseType = z.infer<typeof NewMessageResponseSchema>
