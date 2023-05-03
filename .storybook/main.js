/** @type {import('@storybook/core-common').StorybookConfig} */
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {},
  },
  features: {
    babelModeV7: true,
  },
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test && rule.test.toString() === '/\\.css$/') {
        return {
          test: /\.css$/i,
          sideEffects: true,
          oneOf: [
            {
              assert: {
                type: 'css',
              },
              loader: 'css-loader',
              options: {
                exportType: 'css-style-sheet',
              },
            },
            {
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                },
              ],
            },
          ],
        }
      }
      return rule
    })
    return config
  },
  docs: {
    autodocs: true,
  },
}
