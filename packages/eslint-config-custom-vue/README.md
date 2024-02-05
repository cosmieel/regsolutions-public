# ESLint Configuration for Vue

See [config](/packages/eslint-config-custom-vue/index.js)

## Usage

1. Add dependencies

   ```sh
   npm install --save-dev eslint eslint-config-custom-vue prettier -w=<workspace>
   ```

1. Create `.eslintrc.cjs`

   ```js
   module.exports = {
     root: true,
     extends: ['custom-vue'],
   };
   ```
