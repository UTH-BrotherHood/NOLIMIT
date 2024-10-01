import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Accordion } from '@radix-ui/react-accordion'
import Balancer from 'react-wrap-balancer'

const faqs = [
  {
    id: 'item-2',
    question: 'How does the real-time chat work?',
    answer:
      'Our platform uses WebSocket technology to enable real-time communication, allowing users to send and receive messages instantly.'
  },
  {
    id: 'item-3',
    question: 'Can I schedule meetings with my team?',
    answer: 'Yes, our scheduling feature allows you to create, manage, and invite team members to meetings easily.'
  },
  {
    id: 'item-4',
    question: 'How can I collaborate with my team on projects?',
    answer:
      'You can use our planning tools to assign tasks, set deadlines, and track progress. Additionally, you can communicate in real-time through chat.'
  },
  {
    id: 'item-5',
    question: 'Is my data secure?',
    answer:
      'Yes, we implement industry-standard security protocols, including encryption, to protect your data and ensure privacy.'
  },
  {
    id: 'item-7',
    question: 'What support options are available?',
    answer:
      'We offer multiple support channels, including email support, live chat, and a knowledge base to help you with any questions or issues.'
  }
]

export default function FAQs() {
  return (
    <div className='px-2 xl:px-[20rem] py-11'>
      <div className='flex flex-col justify-center items-center text-center'>
        <h2 data-aos='fade-down' className='text-2xl lg:text-5xl font-bold'>
          FAQ
        </h2>
        <p data-aos='fade-up' className='text-base max-w-sm lg:text-lg lg:max-w-xl text-slate-500'>
          <Balancer>Find answers to common inquiries about our platform</Balancer>
        </p>
      </div>
      <Accordion data-aos='fade-up' className='mt-8 px-4' type='single' collapsible>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
