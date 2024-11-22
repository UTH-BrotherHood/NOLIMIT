import { z } from 'zod'

// Type cho conversation name trong trường hợp chat 1-1
export type ConversationNameType = {
  [key: string]: string
}

// Interface cho từng conversation
export interface IConversation {
  _id: string
  conversation_name: string | ConversationNameType
  is_group: boolean
  creator: string
  created_at: string
  updated_at: string
  role: 'admin' | 'member'
}

// Schema validation với Zod
export const ConversationSchema = z.object({
  _id: z.string(),
  conversation_name: z.union([z.string(), z.record(z.string())]),
  is_group: z.boolean(),
  creator: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  role: z.enum(['admin', 'member'])
})

// Type từ Zod schema
export type ConversationType = z.infer<typeof ConversationSchema>

// Schema cho response API
export const ConversationResponseSchema = z.object({
  message: z.string(),
  data: z.array(ConversationSchema)
})

export type ConversationResponseType = z.infer<typeof ConversationResponseSchema>
