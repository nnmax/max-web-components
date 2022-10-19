import type { Meta, Story } from '@storybook/web-components'
import { html } from 'lit-html'
import '..'

export default {
  title: 'Components/TextField',
  parameters: {
    options: {
      enableShortcuts: false,
    },
  },
  argTypes: {
    'label': {
      type: {
        name: 'string',
      },
    },
    'placeholder': {
      type: {
        name: 'string',
      },
    },
    'helper-text': {
      type: {
        name: 'string',
      },
    },
    'minlength': {
      type: {
        name: 'number',
      },
    },
    'maxlength': {
      type: {
        name: 'number',
      },
    },
    'required': {
      type: {
        name: 'boolean',
      },
    },
  },
} as Meta

export const Basic: Story = ({ label, placeholder, 'helper-text': helperText, required, minlength, maxlength }) =>
  html`
    <max-text-field
      label=${label}
      placeholder=${placeholder}
      helper-text=${helperText}
      maxlength=${maxlength}
      minlength=${minlength}
      ?required=${required}
    ></max-text-field>
  `

export const Label: Story = ({ label }) => html`
  <max-text-field label=${label} aria-label="Enter your email address"></max-text-field>
`
Label.args = {
  label: 'Email Address',
}

export const Placeholder: Story = ({ placeholder }) => html`
  <max-text-field placeholder=${placeholder} aria-label="Enter your email address"></max-text-field>
`
Placeholder.args = {
  placeholder: 'hi.max@foxmail.com',
}

export const HelperText: Story = ({ 'helper-text': helperText, placeholder }) => html`
  <max-text-field
    helper-text=${helperText}
    placeholder=${placeholder}
    aria-label="Enter your username"
  ></max-text-field>
`
HelperText.args = {
  'placeholder': 'Username',
  'helper-text': 'Max 16 characters',
}
