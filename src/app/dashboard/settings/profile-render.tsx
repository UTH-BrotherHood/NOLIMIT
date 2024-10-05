
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail } from '@/app/dashboard/message/data'
import { contacts } from '../message/data'

export default function RenderProfile() {
  return (
    <div className='space-y-6 p-6 bg-gray-100 rounded-lg'>
      <div className='flex items-center space-x-4'>
        <Avatar className='w-40 h-40 rounded-full border-4 border-gray-300'>
          <AvatarFallback className='text-2xl font-bold text-gray-600'>GL</AvatarFallback>
          <AvatarImage
            src='https://citibella.vn/wp-content/uploads/2024/09/anh-avatar-trang-09pycvl.jpg'
            className='rounded-full'
          />
        </Avatar>
        <div>
          <h1 className='font-semibold text-4xl text-stone-950'>User name</h1>
          <p className='text-sm text-gray-500'>Welcome to your profile!</p>
        </div>
      </div>
    </div>
  )
}