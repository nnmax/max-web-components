import type { Meta } from '@storybook/web-components'
import { action } from '@storybook/addon-actions'
import { html } from 'lit-html'
import ButtonDocs from './Button.mdx'
import '../../theme/theme.css'
import '..'

export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      page: ButtonDocs,
    },
  },
  argTypes: {
    variant: {
      defaultValue: 'contained',
      type: {
        name: 'enum',
        value: ['text', 'contained', 'outlined'],
      },
    },
    color: {
      defaultValue: 'primary',
      type: {
        name: 'enum',
        value: ['primary', 'secondary'],
      },
    },
    type: {
      defaultValue: 'button',
      type: {
        name: 'enum',
        value: ['button', 'submit', 'reset'],
      },
    },
    disabled: {
      defaultValue: false,
      type: {
        name: 'boolean',
      },
    },
  },
} as Meta

export const Collection = () => html`
  <div style="display: flex; flex-flow: column nowrap; row-gap: 2em;">
    <div style="display: flex; column-gap: 2em;">
      <max-button @click=${action('button click')} aria-label="describe label" variant="contained" color="primary"
        >Button</max-button
      >
      <max-button @click=${action('button click')} aria-label="describe label" variant="outlined" color="primary"
        >Button</max-button
      >
      <max-button @click=${action('button click')} aria-label="describe label" variant="text" color="primary"
        >Button</max-button
      >
    </div>

    <div style="display: flex; column-gap: 2em;">
      <max-button @click=${action('button click')} aria-label="describe label" variant="contained" color="secondary"
        >Button</max-button
      >
      <max-button @click=${action('button click')} aria-label="describe label" variant="outlined" color="secondary"
        >Button</max-button
      >
      <max-button @click=${action('button click')} aria-label="describe label" variant="text" color="secondary"
        >Button</max-button
      >
    </div>

    <div style="display: flex; column-gap: 2em;">
      <max-button aria-label="describe label" variant="contained" color="primary" disabled>Button</max-button>
      <max-button aria-label="describe label" variant="outlined" color="primary" disabled>Button</max-button>
      <max-button aria-label="describe label" variant="text" color="primary" disabled>Button</max-button>
    </div>
  </div>
`
