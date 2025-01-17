import type { Config } from 'tailwindcss';
import { colorPalette } from './registry/src/components/theme/colors/colorPalette';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontWeight: {
        text: '450'
      },
      boxShadow: {
        'top-lg': '0px -2px 10px 0px rgba(0, 0, 0, 0.15)'
      }
    },
    fontFamily: {
      sans: ['IBM Plex Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: ['IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier', 'monospace']
    },
    colors: colorPalette,
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

  plugins: [require('./registry/plugins/scrollbar.tw.js'), require('./registry/plugins/typography.tw.js')]
};
export default config;
