// scrollbarPlugin.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    '.z-base': {
      zIndex: 0
    },
    '.z-background': {
      zIndex: 1
    },
    '.z-foreground': {
      zIndex: 10
    },
    '.z-header': {
      zIndex: 100
    },
    '.z-footer': {
      zIndex: 100
    },
    '.z-sidebar': {
      zIndex: 100
    },
    '.z-dropdown': {
      zIndex: 1000
    },
    '.z-overlay': {
      zIndex: 2000
    },
    '.z-modal': {
      zIndex: 2000
    },
    '.z-popover': {
      zIndex: 4000
    },
    '.z-tooltip': {
      zIndex: 5000
    },
    '.z-notification': {
      zIndex: 6000
    },
    '.z-spinner': {
      zIndex: 7000
    },
    '.z-max': {
      zIndex: 9999
    }
  });
});
