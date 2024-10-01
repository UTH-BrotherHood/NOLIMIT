'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { TracingBeam } from '@/components/ui/tracing-beam'

export default function Roadmap() {
  return (
    <div className=' w-full overflow-hidden'>
      <h1 className='text-center text-4xl lg:text-5xl font-bold py-8'>Roadmap</h1>
      <TracingBeam className='px-8 '>
        <div className='max-w-2xl mx-auto antialiased pt-4 relative'>
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className='mb-10'>
              <h2 className='bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4'>{item.badge}</h2>

              <p className='text-xl mb-4'>{item.title}</p>

              <div className='text-sm  prose prose-sm dark:prose-invert'>
                {item?.image && (
                  <div className='relative w-full rounded-lg mb-10 overflow-hidden '>
                    <Image
                      src={item.image}
                      alt='blog thumbnail'
                      height='500'
                      width='1000'
                      className='rounded-lg h-72 object-cover'
                    />
                    <div className='absolute inset-0 bg-black opacity-15 hover:opacity-25 transition-all rounded-lg'></div>
                  </div>
                )}
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  )
}

const dummyContent = [
  {
    title: 'Personal and Group Messaging',
    description: (
      <>
        <p>
          Enable personal and group messaging, allowing users to send messages, share files, documents, images, and
          more. This feature will enhance collaboration and communication between users, providing a seamless way to
          stay connected.
        </p>
        <p>
          The messaging system will be easy to use, with the ability to send multimedia files, offering a modern
          communication platform that supports various user needs.
        </p>
        <p>
          Through this functionality, users can easily exchange information in real-time, fostering better team
          collaboration and productivity.
        </p>
      </>
    ),
    badge: 'Messaging',
    image: '/roadmap/Messaging.png'
  },
  {
    title: 'Project Management Features',
    description: (
      <>
        <p>
          Develop project management tools to assist in planning, scheduling tasks, and managing events for individuals
          and teams. This feature will transform the platform into a comprehensive tool for managing work processes and
          timelines effectively.
        </p>
        <p>
          It will enable users to create tasks, assign roles, and monitor project progress, giving teams a centralized
          space to organize their work.
        </p>
      </>
    ),
    badge: 'Project Management',
    image: '/roadmap/ProjectManagement.png'
  },
  {
    title: 'Enhanced Security and Data Encryption',
    description: (
      <>
        <p>
          Strengthen the platform's security with enhanced data encryption to protect user information. Ensuring data
          privacy and integrity is a top priority, especially for sensitive communications and files.
        </p>
        <p>
          By implementing strong encryption protocols, the platform will guarantee that all user data is safeguarded
          against unauthorized access and potential threats.
        </p>
      </>
    ),
    badge: 'Security',
    image: '/roadmap/Security.png'
  }
]
