const plugin = require('tailwindcss/plugin');

const theme = plugin(function ({ addComponents }) {
  const componentNames = ['btn', 'badge']; // Add more component names as needed
  const colorSets = ['default', 'custom', 'primary', 'neutral', 'danger', 'success', 'info']; // Add more color sets as needed
  const stateSets = ['', 'hover', 'active', 'focus'];

  const newComponents = componentNames.reduce((components, name) => {
    colorSets.forEach((color) => {
      stateSets.forEach((state) => {
        const statePrefix = state ? `:${state}` : ''; // Handle pseudo-classes correctly
        const stateClass = state ? `${state}` : ''; // Handle class names correctly

        components[`.${name}.${color}${statePrefix}`] = {
          [`--${name}-${color + (stateClass ? `-${stateClass}` : '')}-border-color`]: `var(--${color + (stateClass ? `-${stateClass}` : '')}-border-color)`,
          [`--${name}-${color + (stateClass ? `-${stateClass}` : '')}-text-color`]: `var(--${color + (stateClass ? `-${stateClass}` : '')}-text-color)`,
          [`--${name}-${color + (stateClass ? `-${stateClass}` : '')}-bg-color`]: `var(--${color + (stateClass ? `-${stateClass}` : '')}-bg-color)`
        };
      });

      // Add disabled styles separately for both pseudo-class and class-based approaches
      const disabledStyles = {
        '--disabled-border-color': 'transparent',
        '--disabled-text-color': 'var(--gray-400)',
        '--disabled-bg-color': 'var(--gray-100)',

        [`--${name}-disabled-border-color`]: `var(--disabled-border-color)`,
        [`--${name}-disabled-text-color`]: `var(--disabled-text-color)`,
        [`--${name}-disabled-bg-color`]: `var(--disabled-bg-color)`
      };

      components[`.${name}.${color}:disabled`] = disabledStyles;
      components[`.${name}.${color}.disabled`] = disabledStyles;
    });

    return components;
  }, {});

  addComponents(newComponents);
});

module.exports = theme;
