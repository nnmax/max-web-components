import '..'

describe('Testing <max-button />', () => {
  it('custom elements should be defined', () => {
    const button = window.customElements.get('max-button')
    expect(button).toBeDefined()
  })

  // TODO: await for JSDOM support `HTMLElement.attachInternals()` API
  // https://github.com/jsdom/jsdom/issues/3444
  it.skip.each([
    { attribute: 'variant', value: 'contained' },
    { attribute: 'variant', value: 'outlined' },
    { attribute: 'variant', value: 'text' },
    { attribute: 'color', value: 'primary' },
    { attribute: 'color', value: 'secondary' },
    { attribute: 'type', value: 'button' },
    { attribute: 'type', value: 'submit' },
    { attribute: 'type', value: 'reset' },
    { attribute: 'disabled', value: '' },
    { attribute: 'role', value: 'menuitem' },
    { attribute: 'tabindex', value: '-1' },
  ])('should render a button with $attribute is `$value`', ({ attribute, value }) => {
    document.body.innerHTML = `
      <max-button ${attribute}="${value}">Button</max-button>
    `

    expect(document.body.innerHTML).toMatchSnapshot()
  })
})
