import Banner from '@/containers/landingpage/banner'
import Customer from '@/containers/landingpage/customer'
import FAQs from '@/containers/landingpage/faqs'
import { Features } from '@/containers/landingpage/features'
import Pricing from '@/containers/landingpage/pricing'
import Showcase from '@/containers/landingpage/showcase'

export default function Home() {
  return (
    <div className='flex-col justify-center items-center'>
      <Banner />
      <Showcase />
      <Customer />
      <Features />
      <Pricing />
      <FAQs />
    </div>
  )
}
