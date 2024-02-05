module.exports = {
  env: {
    es2022: true,
    node: true,
    jest: true,
  },

  extends: [
    'plugin:unicorn/all',
    'plugin:import/recommended',
    'eslint:recommended',
    'prettier',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'no-var': 'error',

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
};
