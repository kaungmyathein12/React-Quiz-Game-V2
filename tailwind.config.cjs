/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },
    extend: {
      backgroundImage: {
        "main-bg": "url('./src/img/bg.svg')",
        "total-bg": "url('./src/img/total.svg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
