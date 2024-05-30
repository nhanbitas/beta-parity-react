module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'tailwindcss/nesting': {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: [
              'default',
              {
                svgo: false
              }
            ]
          }
        }
      : {})
  }
};
