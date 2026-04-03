# sudoku-vue

Working SPA with tests for Sudoku in VueJS 3 (3.5.30) with TypeScript

## Features

For accessing Sudoku, click on Sudoku link on the home page. Features of Sudoku:

1. Integration with [Dosuku](https://sudoku-api.vercel.app/) to fetch new Sudoku puzzle on load of app
2. New puzzle is fetched even when the difficulty level is changed on the Sudoku screen. Although it doesn't really vary the difficulty level of the puzzle, as Dosuku API doesn't support difficulty level parameter as of now (03/04/2026)
3. Shows error when an invalid value is entered.
4. You get an alert when the puzzle is complete.

### Dev notes

The repo was initialized using `vite` with command `npm create vue@latest`
1. Using oxlint for linting, prettier for formatting
2. Tests run using vitest

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup (Optional)

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
