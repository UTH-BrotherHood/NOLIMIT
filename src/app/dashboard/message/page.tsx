// export default function MessagePage() {
//   return (
//     <div className='flex flex-col justify-center items-center h-screen'>
//       <div>Message Page</div>
//       <div>Is Updating</div>
//     </div>
//   )
// }

import { cookies } from 'next/headers'
import Image from 'next/image'

import { Mail } from '@/containers/message/mail'

import { accounts, mails } from '@/app/dashboard/message/data'

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
