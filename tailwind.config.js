/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jetbrains-mono': ['"JetBrains Mono"', '"JetBrains Mono"', '"Menlo"', '"Meslo LG"', 'monospace']
      },
      colors: {
        'bluemoon': '#477BFF',
        'whitesmoke': '#c3cadb',
        'smoke': '#7C818E',
      }
    },
  },
  plugins: [],
}
