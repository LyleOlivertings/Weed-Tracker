module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
      colors: {
        'primary': '#4CAF50',
        'secondary': '#8BC34A',
        'accent': '#FFC107',
      }
    },
  },
  plugins: [],
}