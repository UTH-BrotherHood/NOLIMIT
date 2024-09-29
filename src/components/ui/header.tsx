'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import PlaningIcon from '../../../public/logo-navbar/planning-navbar'
import SchedulingIcon from '../../../public/logo-navbar/scheduling-navbar'
import RealtimeChattingIcon from '../../../public/logo-navbar/realtime-chatting-navbar'
import TempLogo from '../../../public/temp-logo'
import { IconCaretUpFilled, IconMenu2 } from '@tabler/icons-react'
import { forwardRef, useEffect, useState } from 'react'

const resources: { title: string; href: string; description: string }[] = [
  {
    title: 'Documentation',
    href: '/docs',
    description: 'Learn how to get started with our comprehensive documentation.'
  },
  {
    title: 'Community',
    href: '/community',
    description: 'Join our vibrant community to share your ideas and get support from fellow users.'
  },
  {
    title: 'Blog',
    href: '/blog',
    description: 'Read our latest blog posts to stay updated with the latest trends and best practices.'
  }
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <div
      className={`fixed top-0 z-40 w-full flex-none bg-white transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full border-b-2'
      }`}
    >
      <div className='mx-auto px-4 lg:px-8 py-4'>
        <div className='flex h-16 items-center justify-between'>
          <div className='md:flex md:items-center md:gap-12'>
            <a href='/' className='text-2xl font-bold'>
              <TempLogo />
            </a>
          </div>

          <div className='hidden lg:block'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className='flex h-full w-full gap-3 select-none rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md'>
                      <div className='flex flex-col cursor-pointer justify-center items-center text-center rounded-md bg-[#d3e6fc] hover:bg-opacity-80 p-6 w-[18rem] gap-3'>
                        <div>
                          <PlaningIcon />
                        </div>
                        <div>
                          <h3 className='text-xl font-bold'>Planning</h3>
                          <p className='text-xs'>
                            Get started with our comprehensive planning guide to help you achieve your goals.
                          </p>
                        </div>
                      </div>

                      <div className='flex flex-col gap-3'>
                        <div className='flex cursor-pointer items-center justify-between rounded-md bg-[#f7ceac] hover:bg-opacity-80 p-6 w-[25rem] gap-3'>
                          <div>
                            <SchedulingIcon />
                          </div>
                          <div>
                            <h3 className='text-xl font-bold'>Scheduling</h3>
                            <p className='text-xs '>
                              Schedule your tasks and events with ease using our scheduling feature.
                            </p>
                          </div>
                        </div>
                        <div className='flex cursor-pointer items-center justify-between rounded-md bg-[#c9eee3] hover:bg-opacity-80 p-6 w-[25rem] gap-3'>
                          <div>
                            <RealtimeChattingIcon />
                          </div>
                          <div>
                            <h3 className='text-xl font-bold'>Realtime Chatting</h3>
                            <p className='text-xs '>
                              Stay connected with your team and clients in real-time using our powerful chat feature.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                      {resources.map((resource) => (
                        <ListItem key={resource.title} title={resource.title} href={resource.href}>
                          {resource.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href='/pricing' legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href='/about-us' legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Us</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex'>
              <div className='hidden lg:block'>
                <a className=' px-5 py-2.5 text-sm font-semibold text-black ' href='/sign-in'>
                  Sign In
                </a>
                <Link href={'/dashboard'}>
                  <Button size='lg' className='bg-black text-white font-semibold'>
                    Try It Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className='block lg:hidden'>
              <Button size='icon' variant='ghost' onClick={handleMenuToggle}>
                <IconMenu2 />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed top-0 left-0 right-0 bg-white z-50 flex items-center justify-center text-center w-full  transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-0 shadow-2xl border-b-2 rounded-lg' : '-translate-y-full'
            }`}
          >
            <div className='p-4'>
              <a href='/' className='text-2xl font-bold mb-6 block'>
                <TempLogo />
              </a>
              <nav className='space-y-4'>
                <Link href='/features' className='block text-lg font-semibold'>
                  Features
                </Link>
                <Link href='/resources' className='block text-lg font-semibold'>
                  Resources
                </Link>
                <Link href='/pricing' className='block text-lg font-semibold'>
                  Pricing
                </Link>
                <Link href='/about-us' className='block text-lg font-semibold'>
                  About Us
                </Link>
              </nav>
              <div className='block lg:hidden'>
                <Button size='icon' variant='ghost' onClick={handleMenuToggle}>
                  <IconCaretUpFilled />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
