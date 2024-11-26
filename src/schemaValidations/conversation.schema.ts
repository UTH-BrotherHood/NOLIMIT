import { z } from 'zod'

// Type cho thông tin người tham gia
export type ParticipantsType = {
  name: string
  avatar_url: string
  status?: string
  tag?: string
  announcement?: string
}

// Type cho thông tin người gửi trong tin nhắn cuối
export type SenderDetailsType = {
  _id?: string
  username?: string
}

// Type cho tin nhắn cuối cùng
export type LastMessageType = {
  _id?: string
  message_content?: string
  message_type?: string
  is_read?: boolean
  read_by?: string[]
  created_at?: string
  updated_at?: string
  senderDetails: SenderDetailsType
}

// Interface cho từng conversation
export interface IConversation {
  _id: string
  participants: ParticipantsType
  conversation_name: string
  last_message: LastMessageType
  is_group: boolean
  creator: string
  created_at: string
  updated_at: string
}

// Schema validation với Zod
export const ConversationSchema = z.object({
  _id: z.string(),
  participants: z.object({
    name: z.string(),
    avatar_url: z.string(),
    status: z.string().optional(),
    tag: z.string().optional(),
    announcement: z.string().optional()
  }),
  conversation_name: z.string(),
  last_message: z.object({
    _id: z.string().optional(),
    message_content: z.string().optional(),
    message_type: z.string().optional(),
    is_read: z.boolean().optional(),
    read_by: z.array(z.string()).optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    senderDetails: z.object({
      _id: z.string().optional(),
      username: z.string().optional()
    })
  }),
  is_group: z.boolean(),
  creator: z.string(),
  created_at: z.string(),
  updated_at: z.string()
})

// Type từ Zod schema
export type ConversationType = z.infer<typeof ConversationSchema>

// Schema cho response API
export const ConversationResponseSchema = z.object({
  message: z.string(),
  data: z.array(ConversationSchema)
})

export type ConversationResponseType = z.infer<typeof ConversationResponseSchema>
