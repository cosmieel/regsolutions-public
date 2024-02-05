module.exports = {
  extends: [
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'prettier',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'no-var': 'error',

    'vue/padding-line-between-blocks': 'error',
    'vue/padding-lines-in-component-definition': 'error',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],

    'unicorn/no-null': 'off',
    'unicorn/prefer-prototype-methods': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          cmd: false,
          ctx: false,
          args: false,
          db: false,
          temp: false,
          props: false,
          vars: false,
        },
      },
    ],

    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'unknown'],
        alphabetize: { order: 'asc' },
      },
    ],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        ts: 'always',
      },
    ],

    curly: ['error', 'all'],

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: 'for', next: '*' },
      { blankLine: 'always', prev: 'do', next: '*' },
      { blankLine: 'always', prev: 'switch', next: '*' },
      { blankLine: 'always', prev: 'try', next: '*' },
      { blankLine: 'always', prev: 'while', next: '*' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: '*', next: 'for' },
      { blankLine: 'always', prev: '*', next: 'do' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: '*', next: 'while' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'never', prev: 'import', next: 'import' },
    ],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },

    alias: {
      map: [['@', './src']],
      extensions: ['.js', '.vue', '.json'],
    },
  },

  ignorePatterns: ['dist/*'],
};
