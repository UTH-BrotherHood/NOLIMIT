import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function AccountPage() {
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    date_of_birth: '1990-01-01'
  }

  return (
    <div className='grid gap-4'>
      <div>
        <Label>Name</Label>
        <Input type='text' value={userData.name} disabled />
      </div>
      <div>
        <Label>Email</Label>
        <Input type='email' value={userData.email} disabled />
      </div>
      <div>
        <Label>Date of Birth</Label>
        <Input type='date' value={userData.date_of_birth} disabled />
      </div>
      <div className='flex gap-2 mt-4'>
        <Link href='/dashboard/settings/account/edit-account'>
          <Button>Edit</Button>
        </Link>
        <Link href='/dashboard/settings/account/change-password'>
          <Button>Change Password</Button>
        </Link>
      </div>
    </div>
  )
}
