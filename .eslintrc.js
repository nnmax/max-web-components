/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  env: {
    jest: true,
  },
  extends: [
    '@nnmax/eslint-config-typescript',
    'plugin:storybook/recommended',
    'prettier',
  ],
  rules: {},
  ignorePatterns: [
    'coverage/**',
    'es/**',
    'node_modules/**',
    'storybook-static/**',
  ],
}

module.exports = eslintConfig
