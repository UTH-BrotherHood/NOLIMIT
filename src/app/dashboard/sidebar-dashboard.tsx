'use client'
import React, { useState } from 'react'
import {
  IconBrandTelegram,
  IconCalendarTime,
  IconFolderOpen,
  IconLayoutDashboard,
  IconSettings
} from '@tabler/icons-react'
import Link from 'next/link'
import Image from 'next/image'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import NotificationsSheet from '@/containers/dashboardpage/notifications-sheet'

export default function SidebarDashboard() {
  const links = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <IconLayoutDashboard className='h-6 w-6 flex-shrink-0' />
    },
    {
      label: 'Projects',
      href: '/dashboard/projects',
      icon: <IconFolderOpen className='h-6 w-6 flex-shrink-0' />
    },
    {
      label: 'Schedule',
      href: '/dashboard/schedule',
      icon: <IconCalendarTime className='h-6 w-6 flex-shrink-0' />
    },
    {
      label: 'Message',
      href: '/dashboard/message',
      icon: <IconBrandTelegram className='h-6 w-6 flex-shrink-0' />
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: <IconSettings className='h-6 w-6 flex-shrink-0' />
    }
  ]
  const [open, setOpen] = useState(false)
  return (
    <Sidebar animate open={open} setOpen={setOpen}>
      <SidebarBody className='justify-between gap-10'>
        <div className='flex flex-col flex-1 items-center overflow-y-auto overflow-x-hidden'>
          <div>
            <LogoIcon />
            <div className='mt-8 flex flex-col'>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}

              <NotificationsSheet />
            </div>
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: 'Manu Arora',
              href: '#',
              icon: (
                <Image
                  src='https://citibella.vn/wp-content/uploads/2024/09/anh-avatar-trang-09pycvl.jpg'
                  className='h-7 w-7 flex-shrink-0 rounded-full select-none'
                  width={50}
                  height={50}
                  alt='Avatar'
                />
              )
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  )
}

export const LogoIcon = () => {
  return (
    <Link href='/' className=' text-center font-extrabold text-xl  select-none text-black dark:text-white'>
      <span className='block'>NO</span>
      <span className='block text-xs'>LIMIT</span>
    </Link>
  )
}
