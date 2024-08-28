import { colorPalette, themeColors } from './colorPalette';

export const themeConfig = {
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
};
