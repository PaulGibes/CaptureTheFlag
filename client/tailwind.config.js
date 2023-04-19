/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        "1/3": "33.3333%",
        "2/3": "66.6667%",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
