/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'small': {'max': '349px'},
        'mobile': {'min': '350px', 'max': '767px'},
        'tablet': {'min': '768px', 'max': '1200px'},
        'laptop': {'min': '1201px', 'max': '1279px'},
        'desktop': {'min': '1280px', 'max': '1535px'},
        'monitor': {'min': '1536px'},
      },
      fontFamily: {
        'dance': [ 'Dancing Script', 'cursive'],
        'arsenal': ['Arsenal', 'sans-serif'],
        'anton': ['Anton', 'sans-serif'],
        'abril': ['Abril Fatface', 'cursive']
      },
      backgroundImage: {
        'about-bg': "url('/src/images/about-bg-img.jpeg')",
      },
      boxShadow: {
        '3xl': '1px 2px 30px 2px rgba(0,0,0,0.2)',
      },
      keyframes: {
        wiggle: {
          '0%': { top: '8%' },
          '50%': { top: '10%' },
          '100%': { top: '0%' }
        }
      },
      animation: {
        wiggle: 'wiggle 2.8s ease-in-out',
      }
    },
  },
  plugins: [],
}
