/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
      },
      
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
        '1/2xl':'1067px',
        'big-laptops':'1467px',
      },
    },
  },
  plugins: [],
}