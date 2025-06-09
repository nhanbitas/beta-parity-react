## Folders Information:
- `lib`: external library
- `plugins`: the plugins files for config files or project
- `src`: the sources of components
- `ui`: the outputs of the sources of components under dev/build processing, also the publish folder
- `scripts`: the custom cmd scripts with npm

## Registry config files information:
- `tsconfig.json`: the global ts config for ts generation
- `tsconfig.lib.json`: the ts config for dev + build all of components
- `tsconfig.component.json`: the ts config for dev component particularly
- `.babelrc`, `postcss.config.js`: the config for babel/css generation 



## Run repository:
- Install packages: 
  - `npm run install:packages`

- Dev mode: 
  - `npm run dev:lib` to build and watch all component changes
  - Low-performance machine: `cd registry` => `npm run build` => `npm run dev <component-name>`  to build and watch single component changes (ex: `npm run dev Accordion`)

- Preview:
  - `npm run dev` to run nextjs site

- Production mode:
  - `npm run build:lib` to build all components
  - `npm run build` to build nextjs site (root directory)
  - `npm run start` to start the project

- Publish:
  - `cd registry` for moving to registry folder
  - `npm run publish` to publish library

## Stage of processes

### build:lib

- clean ui folder => build css => build babel => build types with ts

### dev:lib

- clean ui folder => watch css => watch babel => watch types

### dev component

- clean ui folder => build:lib (provide dependent component) => watch css (single component) => watch babel (single component) => watch types (all components - trade performance off against code readability)

### publish 

- build the ui folder with relative paths => publish to npm