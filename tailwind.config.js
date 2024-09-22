/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4064ae',
        secondary: '#6fac44',
        gray: '#DCDCDC',
      }
    },
  },
  plugins: [],
}