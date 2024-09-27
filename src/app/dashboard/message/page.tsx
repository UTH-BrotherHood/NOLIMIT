import { cookies } from 'next/headers'

import { Mail } from '@/containers/message/mail'

import { accounts, mails } from '@/app/dashboard/message/data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Message',
  description: 'Stay connected with your team and clients in real-time using our powerful chat feature.'
}

export default function MessagePage() {
  const layout = cookies().get('react-resizable-panels:layout:mail')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <>
      <div className='flex-col h-screen'>
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}
