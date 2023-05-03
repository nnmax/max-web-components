/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  extends: ['@nnmax/eslint-config-typescript', 'plugin:storybook/recommended', 'prettier'],
  ignorePatterns: ['coverage/**', 'es/**', 'node_modules/**', 'storybook-static/**', '.yarn/**', '**/__snapshots__/**'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: false,
        allowNamedExports: true,
        enums: false,
        typedefs: false,
        ignoreTypeReferences: true,
      },
    ],
  },
}

module.exports = eslintConfig
