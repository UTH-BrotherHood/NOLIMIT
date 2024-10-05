// export default function SettingsPage() {
//   return <div>SettingsPage</div>
// }
import { Separator } from '@/components/ui/separator'
import RenderProfile from "@/app/dashboard/settings/profile-render"

export default function Profile(){
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>Customize your name and avatar</p>
      </div>
      <Separator />
      <RenderProfile />
    </div>
  )
}