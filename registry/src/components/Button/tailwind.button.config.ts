import { colorPalette, themeColors } from '../theme/colorPalette';
import { ButtonTheme } from './buttonTheme';
import { themeConfig } from '../theme/themeConfig';

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    ...themeConfig,
    colors: {
      ...colorPalette,
      ...themeColors,
      button: ButtonTheme
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('../../../plugins/scrollbar.tw.js'),
    require('../../../plugins/typography.tw.js'),
    require('../../../plugins/zIndex.tw.js'),
    require('../../../plugins/theme.tw.js')
  ]
};
