/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      bg: '#0E161E',
      fg: '#ffffff',
      primary: '#222E3A',
      secondary: '#252D3A',
      highlight: '#68C0FF',
      grey: '#62707D',
      error: '#F54747'
    }
  },
  plugins: [],
}