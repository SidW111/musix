/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      boxShadow: {
      'neon-purple': '0 0 12px #a855f7',
    },
    },
  },
  plugins: [],
}