/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:storybook/recommended',
  ],
  rules: {
    // ------------ typescript-eslint ------------
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    // ---------- eslint ------------
    'no-template-curly-in-string': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    eqeqeq: 'error',
    'new-cap': 'error',
    'no-caller': 'error',
    'no-confusing-arrow': 'warn',
    'no-var': 'error',
    'prefer-rest-params': 'error',
    'arrow-spacing': ['warn', { before: true, after: true }],
    'block-spacing': 'warn',
    'brace-style': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': 'warn',
    'computed-property-spacing': ['warn', 'never', { enforceForClassMembers: true }],
    indent: ['warn', 2],
    'lines-around-comment': 'warn',
    semi: ['warn', 'never'],
    'jsx-quotes': 'warn',
    'no-multi-spaces': 'warn',
    'space-infix-ops': 'warn',
    'space-in-parens': 'warn',
    'array-bracket-spacing': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'func-call-spacing': 'warn',
    'key-spacing': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'comma-style': 'warn',
    radix: 'error',

    // ------------ import ----------------
    'import/order': 'error',
    'import/first': 'error',
    'import/no-mutable-exports': 'error',

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      ts: 'never',
    }],

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    'import/no-extraneous-dependencies': 'off',
  },
  settings: {
    // https://github.com/import-js/eslint-plugin-import/blob/v2.26.0/README.md#resolvers
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    'import/extensions': ['.js', '.ts'],
  },
  ignorePatterns: [
    'coverage/**',
    'es/**',
    'node_modules/**',
    'storybook-static/**',
  ],
}

module.exports = eslintConfig
