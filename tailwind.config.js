const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      minWidth: {
        'custom-1200': '1200px'
      },
      colors: {
        orange: '#ee4d2d'
      },
      backgroundImage: {
        'footer-texture': 'url(/src/assets/images/footer-texture.png)'
      },
      keyframes: {
        bounce: {
          '0%': {
            transform: 'translateY(2px)'
          },
          '50%': {
            transform: 'translateY(-2px)'
          },
          '100%': {
            transform: 'translateY(2px)'
          }
        }
      },
      animation: {
        bounce1: 'bounce .4s ease infinite alternate',
        bounce2: 'bounce .4s ease infinite .1s alternate',
        bounce3: 'bounce .4s ease infinite .2s alternate'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('minWidth.custom-1200'),
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'calc(100% - 2rem)'
        }
      })
    })
  ]
}
