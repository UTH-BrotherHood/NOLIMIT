import SidebarDashboard from '@/app/dashboard/sidebar-dashboard'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'flex flex-col h-screen w-full md:flex-row bg-red-500 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden'
      }
    >
      <SidebarDashboard />
      <div className='w-full overflow-y-auto scrollbar-default dark:scrollbar-dark'>{children}</div>
    </div>
  )
}
