import { MessageResType } from '@/schemaValidations/message.schema'
import { create } from 'zustand'
import { ConversationType } from '@/schemaValidations/conversation.schema'

// Interface cho việc tạo tin nhắn mới
interface NewMessageType {
  conversation_id: string
  message_content: string
  message_type: 'text' | 'image' | 'file'
}

interface State {
  input: string
  messages: MessageResType[]
  selectedConversation: ConversationType | null
  currentConversationId: string | null
  isLoading: boolean
  error: string | null
}

interface Actions {
  setInput: (input: string) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  setMessages: (messages: MessageResType[]) => void
  addMessage: (message: MessageResType) => void
  handleNewMessage: (message: MessageResType) => void
  setSelectedConversation: (conversation: ConversationType | null) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setCurrentConversationId: (id: string | null) => void
}

const useChatStore = create<State & Actions>()((set, get) => ({
  // State
  input: '',
  messages: [],
  selectedConversation: null,
  currentConversationId: null,
  isLoading: false,
  error: null,

  // Actions
  setInput: (input) => set({ input }),

  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
    set({ input: e.target.value }),

  setMessages: (messages: MessageResType[]) => set({ messages }),

  addMessage: (message: MessageResType) =>
    set((state) => ({
      messages: [...state.messages, message]
    })),

  handleNewMessage: (message: MessageResType) => {
    const { selectedConversation, messages } = get()
    // Chỉ thêm tin nhắn nếu thuộc về conversation hiện tại
    if (selectedConversation?._id === message.conversation_id) {
      set({
        messages: [...messages, message]
      })
    }
  },

  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setCurrentConversationId: (id) => set({ currentConversationId: id })
}))

export default useChatStore
