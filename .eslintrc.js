/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  extends: ['@nnmax/eslint-config-typescript', 'plugin:storybook/recommended', 'prettier'],
  ignorePatterns: ['coverage/**', 'es/**', 'node_modules/**', 'storybook-static/**', '.yarn/**', '**/__snapshots__/**'],
  rules: {
    // TODO: remove to wait for eslint-config
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**',
          'tests/**',
          'spec/**',
          '**/__tests__/**',
          '**/__mocks__/**',
          'test.{js,jsx,ts,tsx}',
          'test-*.{js,jsx,ts,tsx}',
          '**/*{.,_}{test,spec}.{js,jsx,ts,tsx}',
          '**/jest.setup.{js,ts}',
          '**/*.config.*',
          '**/gulpfile.{js,ts}',
          '**/gulpfile.*.{js,ts}',
          '**/Gruntfile{,.js,.ts}',
          '**/protractor.conf.{js,ts}',
          '**/protractor.conf.*.{js,ts}',
          '**/karma.conf.{js,ts}',
          '**/.eslintrc.{js,ts}',
          '**/*.stories.*',
        ],
        optionalDependencies: false,
      },
    ],
  },
}

module.exports = eslintConfig
