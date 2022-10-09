/** @type {import('@storybook/core-common').StorybookConfig} */
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  core: {
    builder: 'webpack5',
  },
  features: {
    babelModeV7: true,
  },
  webpackFinal: (config) => {
    // TODO: await storybook@7 to remove
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test && rule.test.toString() === '/\\.css$/') {
        return {
          test: /\.css$/i,
          sideEffects: true,
          oneOf: [
            {
              assert: { type: 'css' },
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
}
