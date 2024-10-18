import { colorPalette, themeColors } from './src/components/theme/colors';

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  content: ['./src/**/*.{js,jsx,ts,tsx,css}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontWeight: {
        text: 450
      }
    },
    fontFamily: {
      sans: ['IBM Plex Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: ['IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier', 'monospace']
    },
    colors: {
      ...colorPalette,
      ...themeColors
    },
    letterSpacing: {
      tightest: '-.03em',
      tighter: '-.02em',
      tight: '-.01em',
      normal: '0',
      wide: '.01rem',
      wider: '.02em',
      widest: '.03em'
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      circle: 'circle',
      square: 'square',
      'lower-alpha': 'lower-alpha',
      'lower-roman': 'lower-roman',
      'upper-alpha': 'upper-alpha',
      'upper-roman': 'upper-roman'
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('./plugins/scrollbar.tw.js'),
    require('./plugins/typography.tw.js'),
    require('./plugins/zIndex.tw.js'),
    require('./plugins/icons.tw.js'),
    require('./plugins/generate-varaiable.tw.js')
  ]
};
