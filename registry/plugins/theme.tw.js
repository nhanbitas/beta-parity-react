const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addBase, theme }) {
  const colors = theme('colors');

  function generateCssVariables(prefix, obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newPrefix = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'string') {
        prefix ? (acc[`--${newPrefix}`] = value) : (acc[`--${newPrefix}`] = value);
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(acc, generateCssVariables(`${newPrefix}`, value));
      }
      return acc;
    }, {});
  }

  const cssVariables = generateCssVariables('', colors);

  addBase({
    ':root': cssVariables
  });
});
