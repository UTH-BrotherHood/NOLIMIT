import { Message, userData, UserData, Users } from '@/app/dashboard/message/data'
import { create } from 'zustand'

export interface Example {
  name: string
  url: string
}

interface State {
  input: string
  messages: Message[]
  hasInitialAIResponse: boolean
  hasInitialResponse: boolean
}

interface Actions {
  selectedUser: UserData
  setInput: (input: string) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  setMessages: (fn: (messages: Message[]) => Message[]) => void
  setHasInitialAIResponse: (hasInitialAIResponse: boolean) => void
  setHasInitialResponse: (hasInitialResponse: boolean) => void
}

const useChatStore = create<State & Actions>()((set) => ({
  selectedUser: Users[4],

  examples: [
    { name: 'Messenger example', url: '/' },
    { name: 'Chatbot example', url: '/chatbot' },
    { name: 'Chatbot2 example', url: '/chatbot2' }
  ],

  input: '',

  setInput: (input) => set({ input }),
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
    set({ input: e.target.value }),

  messages: userData[0].messages,
  setMessages: (fn) => set(({ messages }) => ({ messages: fn(messages) })),

  hasInitialAIResponse: false,
  setHasInitialAIResponse: (hasInitialAIResponse) => set({ hasInitialAIResponse }),

  hasInitialResponse: false,
  setHasInitialResponse: (hasInitialResponse) => set({ hasInitialResponse })
}))

export default useChatStore
