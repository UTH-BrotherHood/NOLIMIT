import SidebarDashboard from '@/app/dashboard/sidebar-dashboard'
import { ThemeProvider } from '@/components/theme-provider'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'flex flex-col h-screen w-full md:flex-row dark:bg-[#171717] overflow-hidden'}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <SidebarDashboard />
        <div className='w-full overflow-y-auto scrollbar-default '>{children}</div>
      </ThemeProvider>
    </div>
  )
}
