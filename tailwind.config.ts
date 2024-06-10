import type { Config } from 'tailwindcss';

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
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      gray: {
        DEFAULT: '#8D8D8D',
        50: '#F9F9F9',
        100: '#F4F4F4',
        200: '#E0E0E0',
        300: '#C6C6C6',
        400: '#A8A8A8',
        500: '#8D8D8D',
        600: '#6E6E6E',
        700: '#525252',
        800: '#393939',
        900: '#262626',
        950: '#161616'
      },
      orange: {
        DEFAULT: '#FF5715',
        50: '#FFEBE4',
        100: '#FFDBCD',
        200: '#FFBA9F',
        300: '#FF9971',
        400: '#FF7843',
        500: '#FF5715',
        600: '#E64100',
        700: '#B83400',
        800: '#8A2700',
        900: '#5C1A00',
        950: '#451400'
      },
      sky: {
        DEFAULT: '#0AB5FF',
        50: '#D9F3FF',
        100: '#C2EDFF',
        200: '#94DFFF',
        300: '#66D1FF',
        400: '#38C3FF',
        500: '#0AB5FF',
        600: '#0099DB',
        700: '#0079AD',
        800: '#005980',
        900: '#003952',
        950: '#00293B'
      },
      violet: {
        DEFAULT: '#884ACE',
        50: '#F3EDFA',
        100: '#E7DBF5',
        200: '#CFB7EC',
        300: '#B892E2',
        400: '#A06ED8',
        500: '#884ACE',
        600: '#7132B9',
        700: '#5B2895',
        800: '#451E71',
        900: '#2F154C',
        950: '#24103A'
      },
      green: {
        DEFAULT: '#39AC56',
        50: '#D9F2DF',
        100: '#C6ECCF',
        200: '#9FDFAF',
        300: '#79D28F',
        400: '#53C670',
        500: '#39AC56',
        600: '#2F8E47',
        700: '#256F37',
        800: '#1B5028',
        900: '#113219',
        950: '#0B2211'
      },
      red: {
        DEFAULT: '#D62E42',
        50: '#F8DBDE',
        100: '#F4C8CD',
        200: '#EDA1AA',
        300: '#E57B87',
        400: '#DE5465',
        500: '#D62E42',
        600: '#B72436',
        700: '#951D2C',
        800: '#731722',
        900: '#511018',
        950: '#400D13'
      },
      yellow: {
        DEFAULT: '#FFBC05',
        50: '#FFF3D4',
        100: '#FFEDBD',
        200: '#FFE18F',
        300: '#FFD561',
        400: '#FFC833',
        500: '#FFBC05',
        600: '#DBA100',
        700: '#B38300',
        800: '#8A6500',
        900: '#614700',
        950: '#4D3800'
      },
      blue: {
        DEFAULT: '#147AFF',
        50: '#E3EFFF',
        100: '#CCE2FF',
        200: '#9EC8FF',
        300: '#70AEFF',
        400: '#4294FF',
        500: '#147AFF',
        600: '#0063E6',
        700: '#004FB8',
        800: '#003C8A',
        900: '#00285C',
        950: '#001E45'
      },
      transparent: 'transparent',
      inherit: 'inherit'
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

  plugins: [require('./plugins/scrollbar.tw.js'), require('./plugins/typography.tw.js')]
};
export default config;
