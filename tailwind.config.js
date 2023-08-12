/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        default: '0px 0px 2px 0px rgba(0, 0, 0, 0.35)',
        icon: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        'blue-default': '#00C2FF',
        'gray-default': '#c7c7c7'
      },
      fontSize: {
        min: '10px'
      },
      spacing: {
        7.5: '30px'
      }
    }
  },
  plugins: []
}
