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
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import NotificationsSheet from '@/containers/dashboardpage/notifications-sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useLogoutMutation } from '@/queries/useAuth'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

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

  const [openSidebar, setOpenSidebar] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const logoutMutation = useLogoutMutation()
  const router = useRouter()

  const handleLogout = async () => {
    if (logoutMutation.isPending) return

    try {
      setOpenModal(false) // Đóng modal trước khi đăng xuất

      const result = await logoutMutation.mutateAsync()
      const payload = result.payload as { message: string }
      toast({
        title: payload.message
      })

      router.replace('/login') // Điều hướng về trang đăng nhập sau khi đăng xuất thành công
    } catch (error: any) {
      setOpenModal(false) // Đóng modal nếu có lỗi xảy ra
      handleErrorApi({
        error
      })
    }
  }

  const handleCancelLogout = () => {
    setOpenModal(false) // Đóng modal khi hủy bỏ
  }

  return (
    <Sidebar animate open={openSidebar} setOpen={setOpenSidebar}>
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
              <Avatar>
                <AvatarImage
                  src='https://citibella.vn/wp-content/uploads/2024/09/anh-avatar-trang-09pycvl.jpg'
                  alt='Avatar'
                />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center'>
            <DropdownMenuLabel>username</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/dashboard/settings'>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpenModal(true)}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarBody>

      {/* Modal */}
      {openModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>Are you sure you want to log out?</h2>
            <p className='mb-6'>Logging out will end your current session. You can always log back in later.</p>
            <div className='flex justify-end gap-4'>
              <Button onClick={handleCancelLogout}>Cancel</Button>
              <Button variant='destructive' onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export const LogoIcon = () => {
  return (
    <Link href='/' className=' text-center font-extrabold text-xl select-none text-black dark:text-white'>
      <span className='block'>NO</span>
      <span className='block text-xs'>LIMIT</span>
    </Link>
  )
}
