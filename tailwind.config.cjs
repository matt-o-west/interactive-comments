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
        'moderate.blue': '#2F80ED',
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
        },
      }),
    },
  },
  plugins: [],
}
