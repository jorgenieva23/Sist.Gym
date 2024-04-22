/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      // disabledButton: {
      //   pointer-events: "none",
      //   opacity: 0.5,
      //   cursor: "not-allowed",
      // },
      colors: {
        "dark-purple": "#081A51",
        "light.white": "rgba(255,255,255,0.17)",
        silver: "#e5e5e5",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
