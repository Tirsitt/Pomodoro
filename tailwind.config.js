/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pomodoro: {
          red: '#e74c3c',
          green: '#2ecc71',
          blue: '#3498db',
        }
      },
    },
  },
  plugins: [],
}