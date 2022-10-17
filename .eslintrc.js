/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  extends: ['@nnmax/eslint-config-typescript', 'plugin:storybook/recommended', 'prettier'],
  ignorePatterns: ['coverage/**', 'es/**', 'node_modules/**', 'storybook-static/**', '.yarn/**', '**/__snapshots__/**'],
}

module.exports = eslintConfig
