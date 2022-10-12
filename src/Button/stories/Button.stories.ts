import type { Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import '../../theme/theme.css'
import '..'

export default {
  title: 'Components/Button',
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
    <button type="button" onclick="console.log(true)" onkeydown="console.log(false)">button</button>
    <max-button
      onclick="console.log(true)"
      variant=${args.variant}
      color=${args.color}
      type=${args.type}
      ?disabled=${args.disabled}
    >
      ${args.type}
    </max-button>
  `
}
