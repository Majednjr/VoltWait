/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,tsx}', './app/**/*.jsx'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#65CE46',
      },
      backgroundColor: {
        primary: '#65CE46',
      },
      from: {
        primary: '#E5E5E5',
      },
      to: {
        primary: '#f9f9f9',
      },
    },
  },
  plugins: [],
};
