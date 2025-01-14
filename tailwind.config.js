const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        ginger: 'rgba(249, 228, 214, 1)',
      },
    },
    container: {
      center: true,
      padding: '1em',
    },
  },
  safelist: ['py-4', 'py-8', 'py-16', 'py-24', 'py-32', 'py-48', 'py-64'],
  plugins: [require('@tailwindcss/typography')],
}
