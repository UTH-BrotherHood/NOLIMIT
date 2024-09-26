import TempLogo from '../../../public/temp-logo'

export default function Footer() {
  return (
    <footer className='bg-gray-50 '>
      <div className='flex flex-col items-center px-4 py-8'>
        <TempLogo />
        <div className='mt-4 text-sm text-gray-500'>Copyright &copy; 2024. All rights reserved.</div>
      </div>
    </footer>
  )
}
