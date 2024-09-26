import Banner from '@/containers/landingpage/banner'
import FAQs from '@/containers/landingpage/faqs'
import Showcase from '@/containers/landingpage/showcase'

export default function Home() {
  return (
    <div className='flex-col justify-center items-center'>
      <Banner />
      <Showcase />
      <FAQs />
    </div>
  )
}
