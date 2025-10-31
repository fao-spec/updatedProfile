/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
   keyframes: {
    slideFromLeft: {
      "0%": { opacity: "0", transform: "translateX(-150px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
    slideFromRight: {
      "0%": { opacity: "0", transform: "translateX(150px)" },
      "100%": { opacity: "1", transform: "translateX(0)" },
    },
  },
  animation: {
    slideFromLeft: "slideFromLeft .7s ease-out forwards",
    slideFromRight: "slideFromRight .7s ease-out forwards",
  },
};
