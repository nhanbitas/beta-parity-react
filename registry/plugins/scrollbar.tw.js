// scrollbarPlugin.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addBase, addUtilities }) {
  addBase({
    '::-webkit-scrollbar-track': {
      borderRadius: '5px'
    },
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
      backgroundColor: 'transparent'
    },
    '::-webkit-scrollbar-track': {
      background: 'rgba(128, 128, 128, 0.2)'
    },
    '::-webkit-scrollbar-track:hover': {
      background: 'rgba(128, 128, 128, 0.3)'
    },
    '::-webkit-scrollbar-thumb': {
      width: '8px',
      borderRadius: '5px',
      background: 'rgba(128, 128, 128, 0.5)'
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(128, 128, 128, 0.75)'
    },
    '::-webkit-scrollbar-button:single-button': {
      backgroundColor: 'transparent',
      display: 'block',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    '::-webkit-scrollbar-button:single-button:vertical:decrement': {
      height: '12px',
      width: '10px',
      backgroundPosition: 'center center',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='120' fill='rgb(96, 96, 96)'><polygon points='50,20 10,80 90,80'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:vertical:decrement:hover': {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='120' fill='rgb(112, 112, 112)'><polygon points='50,20 10,80 90,80'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:vertical:decrement:active': {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='120' fill='rgb(128, 128, 128)'><polygon points='50,20 10,80 90,80'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:vertical:increment': {
      height: '12px',
      width: '10px',
      backgroundPosition: 'center center',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='120' fill='rgb(96, 96, 96)'><polygon points='50,100 10,40 90,40'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:vertical:increment:hover': {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='120' fill='rgb(112, 112, 112)'><polygon points='50,100 10,40 90,40'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:vertical:increment:active': {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='120' fill='rgb(128, 128, 128)'><polygon points='50,100 10,40 90,40'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:horizontal:decrement': {
      height: '10px',
      width: '12px',
      backgroundPosition: 'center center',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='100' fill='rgb(96, 96, 96)'><polygon points='20,50 80,10 80,90'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:horizontal:decrement:hover': {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='100' fill='rgb(112, 112, 112)'><polygon points='20,50 80,10 80,90'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:horizontal:decrement:active': {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='100' fill='rgb(128, 128, 128)'><polygon points='20,50 80,10 80,90'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:horizontal:increment': {
      height: '10px',
      width: '12px',
      backgroundPosition: 'center center',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='100' fill='rgb(96, 96, 96)'><polygon points='100,50 40,10 40,90'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:horizontal:increment:hover': {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='100' fill='rgb(112, 112, 112)'><polygon points='100,50 40,10 40,90'/></svg>")`
    },
    '::-webkit-scrollbar-button:single-button:horizontal:increment:active': {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='100' fill='rgb(128, 128, 128)'><polygon points='100,50 40,10 40,90'/></svg>")`
    },
    '*': {
      scrollbarWidth: 'thin'
    }
  });

  addUtilities({
    '.scrollbar-none::-webkit-scrollbar': {
      display: 'none'
    },
    '.scrollbar-none': {
      '-ms-overflow-style': 'none' /* IE and Edge */,
      'scrollbar-width': 'none' /* Firefox */
    }
  });
});
