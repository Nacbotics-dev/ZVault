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
      fontSize: {
        'btn-clamp': 'clamp(1rem, 0.8438rem + 0.5vw, 1.125rem);',
        'bigHead-clamp': 'clamp(1.5625rem, -0.4688rem + 6.5vw, 3.1875rem);',
        'midHead-clamp': 'clamp(1.5625rem, 1.0156rem + 1.75vw, 2rem);',
        'mid-1Head-clamp': 'clamp(1.125rem, 0.6563rem + 1.5vw, 1.5rem);',
        'smHead-clamp': 'clamp(0.875rem, -0.2188rem + 3.5vw, 1.75rem);',
        'smHead1-clamp': 'clamp(0.75rem, 0.2813rem + 1.5vw, 1.125rem);',
      },
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
    },
  },
  plugins: [],
}