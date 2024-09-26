import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Accordion } from '@radix-ui/react-accordion'

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
    <div className='px-8 xl:px-[20rem] py-11'>
      <Accordion type='single' collapsible>
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
