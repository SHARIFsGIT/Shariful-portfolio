import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        lock: "url('/assets/background/helios-light.jpg')",
      },
      cursor: {
        'custom-pointer': "url('/assets/cursor/Link.png') 0 0, pointer",
        'custom-auto': "url('/assets/cursor/Normal.png') 0 0, auto",
      },
      colors: {
        primary: '#007AFF',
        'light-background': '#F7F7F7',
        'dark-background': '#212121',
        'light-foreground': '#e5e5e5',
        'dark-foreground': '#282828',
        'dark-text': '#e4e4e4',
        'light-text': '#191919',
        'dark-input-bg': '#353535',
        'light-input-bg': '#e5e5e5',
        'dark-border': '#191919',
        'light-border': '#cacaca',
        'dark-hover-bg': '#383838',
        'dark-context-bg': '#343434',
        customBlue: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'wallpaper-fade': 'fadeInOut 5s linear infinite',
        'bounce-once': 'bounce-once 0.5s ease-in-out 1',
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1)' },
        },
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
