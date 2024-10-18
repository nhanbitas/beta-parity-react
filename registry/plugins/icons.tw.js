const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    'chevron-down': {
      height: '100%',
      width: '2.5rem',
      'pointer-events': 'none',
      'mask-position': 'center center',
      'mask-repeat': 'no-repeat',
      'mask-image':
        "data:image/svg+xml;utf8,<svg height='16px' width='16px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='M6 9L12 15L18 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>"
    },
    'chevron-selector-vertical-mini': {
      height: '100%',
      width: '1rem',
      'pointer-events': 'none',
      'mask-position': 'center center',
      'mask-repeat': 'no-repeat',
      'mask-image':
        "data:image/svg+xml;utf8,<svg height='12px' width='12px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' d='M4.667 10 8 13.333 11.334 10M4.667 6 8 2.667 11.334 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>"
    },
    'chevron-up': {
      height: '100%',
      width: '2.5rem',
      'pointer-events': 'none',
      'mask-position': 'center center',
      'mask-repeat': 'no-repeat',
      'mask-image':
        "data:image/svg+xml;utf8,<svg height='16px' width='16px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='M18 15L12 9L6 15' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>"
    },
    asterisk: {
      height: '100%',
      width: '1rem',
      'pointer-events': 'none',
      'mask-position': 'center center',
      'mask-repeat': 'no-repeat',
      'mask-image':
        "data:image/svg+xml;utf8,<svg height='10px' width='10px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='M12 4V20M18 6L6 18M20 12H4M18 18L6 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>"
    }
  });
});
