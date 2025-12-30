/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        brand: {
          bronze: '#8B5A2B',
          dark: '#0F0F0F',
          charcoal: '#1A1A1A',
          light: '#F5F5F0',
          accent: '#D4AF37'
        }
      }
    },
  },
  plugins: [],
}

