import type { Meta, Story } from '@storybook/web-components'
import { html } from 'lit-html'
import '../../theme/theme.css'
import '..'

export default {
  title: 'Components/Checkbox',
  argTypes: {
    color: {
      defaultValue: 'primary',
      type: {
        name: 'enum',
        value: ['primary', 'secondary'],
      },
    },
    value: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    checked: {
      type: {
        name: 'boolean',
      },
    },
    disabled: {
      type: {
        name: 'boolean',
      },
    },
    indeterminate: {
      defaultValue: false,
      type: {
        name: 'boolean',
      },
    },
  },
} as Meta

export const Basic = ({ color, value, checked, indeterminate, disabled }) => {
  return html`
    <max-checkbox
      color=${color}
      value=${value}
      ?disabled=${disabled}
      name="my-checkbox"
      ?checked=${checked}
      ?indeterminate=${indeterminate}
      >Checkbox</max-checkbox
    >
  `
}

export const Color: Story = () => html`
  <max-checkbox color="primary" checked>Primary</max-checkbox>
  <max-checkbox color="secondary" checked>Secondary</max-checkbox>
`

export const Disabled: Story = () => html`
  <max-checkbox disabled>Unchecked Disabled</max-checkbox>
  <max-checkbox checked disabled>Checked Disabled</max-checkbox>
`

export const Indeterminate: Story = () => html`
  <max-checkbox indeterminate color="primary"></max-checkbox>
  <max-checkbox indeterminate color="secondary"></max-checkbox>
`
