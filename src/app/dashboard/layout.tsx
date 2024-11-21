import SidebarDashboard from '@/app/dashboard/sidebar-dashboard'
import { ThemeProvider } from '@/components/theme-provider'
import { Badge } from '@/components/ui/badge'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
      <div className='lg:hidden flex flex-col items-center justify-center h-screen'>
        <Badge>Mobile currently unavailable</Badge>
        <div>Please open this page on desktop</div>
      </div>
      <div className='hidden lg:flex h-screen w-full dark:bg-[#171717]'>
        <SidebarDashboard />
        <div className='w-full ml-[55px] scrollbar-default dark:scrollbar-dark'>{children}</div>
      </div>
    </ThemeProvider>
  )
}
