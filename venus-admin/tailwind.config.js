/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'venus-pink': '#AA1F64', // Já deixei sua cor principal aqui
      },
    },
  },
  plugins: [],
}