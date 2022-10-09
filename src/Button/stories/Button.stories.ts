import type { Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import '..'

export default {
  title: 'Components/MaxButton',
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
} as Meta

export const Variant = (args) => html`
  <max-button variant=${args.variant}>Variant</max-button>
`

export const Color = (args) => html`
  <max-button color=${args.color}>Variant</max-button>
`

export const Type = (args) => html`
  <max-button type=${args.type}>Variant</max-button>
`
