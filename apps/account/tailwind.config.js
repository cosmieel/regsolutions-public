/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'node_modules/preline/dist/*.js'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    extend: {
      colors: {
        blue: {
          50: '#F5F9FF',
          100: '#EDF4FF',
          200: '#C3DAFF',
          300: '#95B7FF',
          400: '#5C8AFF',
          500: '#4F7FFF',
          600: '#406CFF',
          700: '#3755FA',
          800: '#2B48ED',
          900: '#233CC8',
        },
        red: {
          500: '#F24E4E',
        },
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
