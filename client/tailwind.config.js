/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyprus: { DEFAULT: '#004741', dark: '#00332f', light: '#0b625a' },
        sand: { DEFAULT: '#F0EDE4', deep: '#E4DFD1' },
        brick: '#9A4B2E', // taken from the church's brick walls
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
