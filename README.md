
## About Parity React:

This project is reusable components for web/app built in react components, that was built based on Parity Design System [Parity Design System](#about-parity-react), [Nextjs](https://nextjs.org/),

## How to start repository?

- Clone repository

- Install packages: `npm run install:packages`

- Dev mode: 
  - `npm run dev:lib` to build and watch all component changes
  - Low-performance machine: `cd registry` => `npm run build` => `npm run dev <component-name>`  to build and watch single component changes (ex: `npm run dev Accordion`)

- Preview:
  - `npm run dev` to run nextjs site

- Production mode:
  - `npm run build` to build lib and nextjs site (root directory)

- Publish:
  - `cd registry` for moving to registry folder
  - `npm run publish` to publish library