import { Separator } from "@/components/ui/separator";
import  AccountForm  from "./account-edit";

export default function AccountPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Account</h3>
        <p className='text-sm text-muted-foreground'>
          Edit your account!
        </p>
      </div>
      <Separator />
      <AccountForm/>
    </div>
  )
}
