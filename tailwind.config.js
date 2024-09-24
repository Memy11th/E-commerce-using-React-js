/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,tsx}','./index.html'],
  theme: {
    extend: {
      animation: {
        'gradient-text': 'gradient-text 3s ease infinite',
      },
      keyframes: {
        'gradient-text': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}


