/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-inter)'],
      },
      colors: {
        textarea: '#111823',
        chatbg: "#203449",
        wizelinered: '#e93d44',
        background: '#222529'
      },
    },
  },
  plugins: [],
}
