/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      bg: '#151515',
      fg: '#ffffff',
      primary: '#100E0E',
      secondary: '#252D3A',
      highlight: '#97E7E1',
      grey: '#A2ACB0',
      error: '#F54747'
    }
  },
  plugins: [],
}