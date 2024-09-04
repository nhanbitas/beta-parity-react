const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addBase, theme }) {
  const colors = theme('colors');

  function generateCssVariables(prefix, obj) {
    const hexToRgb = (hex) => {
      hex = hex.replace(/^#/, '');
      let r = parseInt(hex.slice(0, 2), 16);
      let g = parseInt(hex.slice(2, 4), 16);
      let b = parseInt(hex.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    };

    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newPrefix = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'string') {
        acc[`--${newPrefix}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(acc, generateCssVariables(`${newPrefix}`, value));
      }
      return acc;
    }, {});
  }

  const cssVariables = generateCssVariables('par', colors);

  addBase({
    ':root': cssVariables
  });
});
