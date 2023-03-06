/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'very.light.gray': '#F5F6FA',
        'light.gray': '#E9EBF0',
        'dark.gray': '#333333',
        'grayish.blue': '#67727E',
        'light.grayish.blue': '#C5C6EF',
        'moderate.blue': '#5357B6',
        'dark.blue': '#334253',
        'pale.red': '#FFB8BB',
        'soft.red': '#ED6368',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      userBadge: (theme) => ({
        default: {
          backgroundColor: theme('moderate.blue'),
          color: theme('white'),
          fontWeight: 500,
        },
      }),
      submitButton: (theme) => ({
        default: {
          backgroundColor: theme('moderate.blue'),
          color: theme('white'),
          fontWeight: 500,
          '&:hover': {
            backgroundColor: theme('light.grayish.blue'),
          },
          cursor: 'pointer',
        },
      }),
    },
    screens: {
      phone: '320px',

      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
