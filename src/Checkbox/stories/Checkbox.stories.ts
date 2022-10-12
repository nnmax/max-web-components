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
    <form action="https://asfffsdadsdf.com" name="form">
      <input type="text" name="name" />
      <max-checkbox
        color=${color}
        value=${value}
        ?disabled=${disabled}
        name="my-checkbox"
        ?checked=${checked}
        ?indeterminate=${indeterminate}
        >Checkbox</max-checkbox
      >
      <button type="submit">Submit</button>
    </form>
  `
}
