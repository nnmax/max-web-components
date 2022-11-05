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

export const Collection = () => html`
  <div style="display: flex; flex-flow: column nowrap; row-gap: 2em;">
    <div style="display: flex; column-gap: 2em;">
      <max-checkbox color="primary">Checkbox</max-checkbox>
      <max-checkbox color="secondary">Checkbox</max-checkbox>
    </div>

    <div style="display: flex; column-gap: 2em;">
      <max-checkbox color="primary" checked>Checkbox</max-checkbox>
      <max-checkbox color="secondary" checked>Checkbox</max-checkbox>
    </div>

    <div style="display: flex; column-gap: 2em;">
      <max-checkbox color="primary" disabled>Checkbox</max-checkbox>
      <max-checkbox color="secondary" disabled>Checkbox</max-checkbox>
    </div>

    <div style="display: flex; column-gap: 2em;">
      <max-checkbox color="primary" checked disabled>Checkbox</max-checkbox>
      <max-checkbox color="secondary" checked disabled>Checkbox</max-checkbox>
    </div>

    <div style="display: flex; column-gap: 2em;">
      <max-checkbox color="primary" indeterminate>Checkbox</max-checkbox>
      <max-checkbox color="secondary" indeterminate>Checkbox</max-checkbox>
    </div>

    <div style="display: flex; column-gap: 2em;">
      <max-checkbox color="primary" indeterminate disabled>Checkbox</max-checkbox>
      <max-checkbox color="secondary" indeterminate disabled>Checkbox</max-checkbox>
    </div>
  </div>
`
