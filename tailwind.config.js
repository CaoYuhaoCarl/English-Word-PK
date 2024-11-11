/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f1fcf9',
          '100': '#d1f6ee',
          '200': '#a3ecde',
          '300': '#6ddbca',
          '400': '#49c5b5',
          '500': '#26a698',
          '600': '#1c857c',
          '700': '#1a6b65',
          '800': '#195652',
          '900': '#194844',
          '950': '#092a2a',
        },
      },
    },
  },
  plugins: [],
};