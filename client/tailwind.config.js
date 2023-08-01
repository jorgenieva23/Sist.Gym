/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light.white": "rgba(255,255,255,0.17)",
        "silver":"#e5e5e5"
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      }
    }
  },
  plugins: []
}
