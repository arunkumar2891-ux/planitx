import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A1A',
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#A3A3A3',
          400: '#737373',
          500: '#1A1A1A',
          600: '#141414',
          700: '#0F0F0F',
          800: '#0A0A0A',
          900: '#050505',
        },
        accent: {
          DEFAULT: '#C41E3A',
          50: '#FEF2F4',
          100: '#FDE6EA',
          200: '#F9C0CA',
          300: '#F49AAA',
          400: '#E04E6A',
          500: '#C41E3A',
          600: '#A91832',
          700: '#8E1329',
          800: '#730F21',
          900: '#5C0C1A',
        },
        surface: '#FFFFFF',
        background: '#FAFAF8',
        muted: '#6B7280',
        border: '#E5E5E5',
        success: '#059669',
        warning: '#D97706',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
        premium: '0 4px 20px rgba(196, 30, 58, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
