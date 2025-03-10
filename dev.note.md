## Folders infomation:
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

## Stage of processes

### build:lib

- clean ui folder => build css => build babel => build types with ts => change '@ui/' to relative paths in .d.ts files with ts-alias 

### dev:lib

- clean ui folder => build css => build babel => build types

 >Note: ts-alias do not support --watch, in dev mode, we can not change '@ui/' to relative paths in .d.ts

 >Solution: in the tsconfig.json of nextjs (tsconfig of preview project), add  "paths": {"@ui/*": ["./registry/ui/*"]} for handle `@ui`

### publish 

- build the ui foler with relative paths => publish to npm