const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', defaultTheme.fontFamily.sans],
      serif: ['Literata Variable', defaultTheme.fontFamily.serif],
    },
    extend: {
      colors: {
        ginger: 'rgba(249, 228, 214, 1)',
        redleather: 'rgba(173, 76, 78, 1)',
      },
      typography: (theme) => ({
        percy: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-lead': theme('colors.black'),
            '--tw-prose-links': theme('colors.black'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.black'),
            '--tw-prose-bullets': theme('colors.black'),
            '--tw-prose-hr': theme('colors.black'),
            '--tw-prose-quotes': theme('colors.black'),
            '--tw-prose-quote-borders': theme('colors.black'),
            '--tw-prose-captions': theme('colors.black'),
            '--tw-prose-code': theme('colors.black'),
            '--tw-prose-pre-code': theme('colors.black'),
            '--tw-prose-pre-bg': theme('colors.black'),
            '--tw-prose-th-borders': theme('colors.black'),
            '--tw-prose-td-borders': theme('colors.black'),
          },
        },
      }),
    },
    container: {
      center: true,
      padding: '1em',
    },
  },
  safelist: ['py-4', 'py-8', 'py-16', 'py-24', 'py-32', 'py-48', 'py-64'],
  plugins: [require('@tailwindcss/typography')],
}
