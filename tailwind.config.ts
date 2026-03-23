import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:     '#1A1A2E',
        blue:     '#0A66C2',
        'blue-light': '#1877D2',
        ivory:    '#F9F8F6',
        'sky-tint': '#EAF2FB',
        slate:    '#5A5A6E',
        mist:     '#E8E4DC',
      },
      fontFamily: {
        serif: ['Times New Roman', 'Times', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn:  '8px',
        pill: '20px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(10,102,194,0.07)',
        'card-hover': '0 8px 32px rgba(10,102,194,0.14)',
        blue: '0 4px 24px rgba(10,102,194,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
