import { html } from 'lit-html'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [(story) => html`<div style="margin: 5em;">${story()}</div>`]
