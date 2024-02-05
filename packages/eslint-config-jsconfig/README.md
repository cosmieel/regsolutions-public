# ESLint Configuration for JavaScript

See [config](/packages/eslint-config-jsconfig/index.js)

## Usage

1. Add dependencies

   ```sh
   npm install --save-dev eslint eslint-config-jsconfig prettier -w=<workspace>
   ```

1. Create `.eslintrc.cjs`

   ```js
   module.exports = {
     root: true,
     extends: ['jsconfig'],
   };
   ```
