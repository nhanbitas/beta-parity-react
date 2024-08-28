import { themeConfig } from './src/components/theme/themeConfig.ts';

/** @type {import('tailwindcss').Config} */

module.exports = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: ['./src/**/*.{js,jsx,ts,tsx,css}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  theme: themeConfig,
  plugins: [
    require('@tailwindcss/container-queries'),
    require('./plugins/scrollbar.tw.js'),
    require('./plugins/typography.tw.js'),
    require('./plugins/zIndex.tw.js'),
    require('./plugins/theme.tw.js')
  ]
};
