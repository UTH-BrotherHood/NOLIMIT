'use client'

import { useTheme } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'

export default function TopLoader() {
  const theme = localStorage.getItem('theme')
  if (!theme) {
    localStorage.setItem('theme', 'light')
  }
  const isDarkMode = theme === 'dark'
  console.log(theme)

  return (
    <NextTopLoader
      color={isDarkMode ? '#ffffff' : '#0f0f0f'}
      initialPosition={0.08}
      crawlSpeed={1000}
      height={3}
      crawl={true}
      showSpinner={false}
      shadow={
        isDarkMode
          ? '0px 2px 8px 0px rgba(255, 255, 255, .22), 0px 1px 48px 0px rgba(255, 255, 255, .24)'
          : '0px 2px 8px 0px rgba(62, 177, 255, .22), 0px 1px 48px 0px rgba(62, 177, 255, .24)'
      }
      easing='ease'
      speed={500}
    />
  )
}
