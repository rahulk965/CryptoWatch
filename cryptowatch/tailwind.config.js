/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(210, 20%, 98%)',
          dark: 'hsl(220, 15%, 10%)',
        },
        foreground: {
          DEFAULT: 'hsl(220, 18%, 20%)',
          dark: 'hsl(210, 20%, 96%)',
        },
        primary: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
      },
    },
  },
  plugins: [],
}
