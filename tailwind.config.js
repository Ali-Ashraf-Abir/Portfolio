/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Oswald:['Oswald'],
        rubick:['Rubik Distressed'],
        modak:['Modak'],
        nunito:['nunito'],
        bebas:['Bebas Neue'],
        incon:['"Inconsolata"']
      }
    },
  },
  plugins: [],
}

