/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      primary: '#3B69F4',
      'light-gray-text': '#515561',
      link: '#337ab7',
      selected: {
        light: '#dff3fd'
      },
      resultselected: {
        light: '#40a8fe'
      },
      poblue: {
        light: '#64b5f6',
        medium: '#1e88e5',
        dark: '#0d47a1'
      },
      poyellow: {
        light: '#fff176',
        medium: '#fdd835',
        dark: '#f57f17'
      },
      pogreen: {
        light: '#81c784',
        medium: '#43a047',
        dark: '#1b5e20'
      },
      pored: {
        light: '#e57373',
        medium: '#e53935',
        dark: '#b71c1c'
      },
      poorange: {
        light: '#ffb74d',
        medium: '#fb8c00',
        dark: '#e65100'
      }
    },
    extend: {}
  },
  plugins: []
};

