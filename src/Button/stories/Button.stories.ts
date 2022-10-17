import type { Meta, Story } from '@storybook/web-components'
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

export const Basic = (args) => {
  return html`
    <max-button
      variant=${args.variant}
      color=${args.color}
      type=${args.type}
      ?disabled=${args.disabled}
      aria-label=${args.type}
      @click=${action('click')}
      >${args.type}</max-button
    >
  `
}

export const Variant: Story = () => html`
  <div style="display: flex; column-gap: 16px;">
    <max-button variant="contained">Contained</max-button>
    <max-button variant="outlined">Outlined</max-button>
    <max-button variant="text">Text</max-button>
  </div>
`

export const Color: Story = () => html`
  <div style="display: flex; column-gap: 16px;">
    <max-button color="primary">Primary</max-button>
    <max-button color="secondary" variant="outlined">Secondary</max-button>
  </div>
`

export const Type: Story = () => html`
  <div style="display: flex; flex-flow: column; row-gap: 16px;">
    <max-button type="button">Plain Button</max-button>

    <form action="https://foo.bar">
      <input type="text" name="foo" />
      <max-button type="submit">Submit</max-button>
    </form>

    <form>
      <input type="text" name="foo" />
      <max-button type="reset">Reset</max-button>
    </form>
  </div>
`

export const Disabled: Story = () => html`
  <div style="display: flex; column-gap: 16px;">
    <max-button variant="contained" disabled>Contained</max-button>
    <max-button variant="outlined" disabled>Outlined</max-button>
    <max-button variant="text" disabled>Text</max-button>
  </div>
`
