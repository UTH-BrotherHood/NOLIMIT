import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      scrollbar: {
        DEFAULT: {
          '&::-webkit-scrollbar': {
            width: '0.5rem' // tương đương w-2 (0.5rem)
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '9999px', // tương đương rounded-full
            backgroundColor: '#f3f4f6' // tương đương bg-gray-100
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '9999px', // tương đương rounded-full
            backgroundColor: '#374151' // tương đương bg-gray-700
          }
        },
        dark: {
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#374151' // tương đương bg-neutral-700
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#6b7280' // tương đương bg-neutral-500
          }
        }
      },
      backgroundColor: {
        darkPrimaryBg: '#121212',
        darkSecondaryBg: '#111C44'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>, variants?: string[]) => void }) {
      const scrollbarUtilities = {
        '.scrollbar-default': {
          '&::-webkit-scrollbar': {
            width: '0.5rem'
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '9999px',
            backgroundColor: '#f3f4f6'
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '9999px',
            backgroundColor: '#374151'
          }
        },
        '.scrollbar-dark': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#374151'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#6b7280'
          }
        }
      }

      addUtilities(scrollbarUtilities, ['dark'])
    }
  ]
}
export default config
