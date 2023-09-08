/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // borderColor: 'green',
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
      spacing: {
        'sm': '3.25rem',
        'md': '3.75rem',
        'lg': '32rem',
        'xl': '36rem',
      },
      backgroundImage: {
        'about-bg': "url('/src/images/about-bg-img.jpeg')",
        'fallwp-bg': "url('/src/images/fall_walpaper.webp')",
        'login1-bg': "url('/src/images/login1.jpeg')",
        'login2-bg': "url('/src/images/login2.jpeg')",
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        '3xl': '1px 2px 30px 2px rgba(0,0,0,0.2)',
      },
      keyframes: {
        wiggle: {
          '0%': { top: '8%' },
          '50%': { top: '10%' },
          '100%': { top: '0%' }
        },
        mymove: {
          '0%, 100%': { transform: 'scale3d(1.2, 1.2, 1)' },
          '50%': { transform: 'scale3d(1.1, 1.1, 1)' },
        },
        spinreverse: {
          'from': {
            transform: 'rotate(360deg)'
          },
          'to': {
            transform: 'rotate(0deg)'
          }
        }
      },
      animation: {
        mymove: 'mymove 1s infinite',
        spinreverse: 'spinreverse 1s linear infinite',
        wiggle: 'wiggle 2.8s ease-in-out',

      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      safelist: [
        'animate-[fade-in_1s_ease-in-out]', 
        'animate-[fade-in-down_1s_ease-in-out]'
      ]
      },
    },
  plugins: [],
}
