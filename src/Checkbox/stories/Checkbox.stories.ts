import type { Meta } from '@storybook/web-components'
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
      defaultValue: false,
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

export const Basic = ({ color, value, checked, indeterminate }) => {
  return html`
    <max-checkbox color=${color} value=${value} ?checked=${checked} ?indeterminate=${indeterminate}
      >Checkbox</max-checkbox
    >
  `
}
