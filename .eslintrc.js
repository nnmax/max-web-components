/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    browser: true,
    jest: true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base', 'plugin:storybook/recommended'],
  rules: {
    'import/no-unresolved': 'error',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      ts: 'never'
    }]
  },
  settings: {
    // https://github.com/import-js/eslint-plugin-import/blob/v2.26.0/README.md#resolvers
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      }
    }
  }
};
module.exports = eslintConfig;