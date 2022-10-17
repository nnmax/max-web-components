import { expect, fixture, oneEvent, html } from '@open-wc/testing'
import Button from '../Button'
import '..'

describe('Testing <max-button />', () => {
  let button: Button

  beforeEach(async () => {
    button = await fixture('<max-button>Button</max-button>')
  })

  afterEach(() => {
    button = null
  })

  it('custom elements should be defined', () => {
    const button = window.customElements.get(Button.is)
    expect(button).to.not.undefined
  })

  describe('testing <max-button /> snapshots', () => {
    const tests = [
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
    ]

    tests.forEach(({ attribute, value }) => {
      // TODO: @eslint-config overwrite test file
      // eslint-disable-next-line max-nested-callbacks
      it(`should render a button with ${attribute} is ${value}`, () => {
        button.setAttribute(attribute, value)
        expect(button).dom.to.equalSnapshot()
      })
    })
  })

  it('when set disabled, should also set aria-disabled', async () => {
    expect(button).to.not.have.attribute('disabled')
    expect(button).to.not.have.attribute('aria-disabled')
    button.toggleAttribute('disabled')
    expect(button).to.have.attribute('disabled')
    expect(button).to.have.attribute('aria-disabled')
  })

  it('should render a button with role is `button`', () => {
    expect(button).to.have.attribute('role', 'button')
  })

  it('should render a button with tabindex is 0', () => {
    expect(button).to.have.attribute('tabindex', '0')
  })

  it('should render a button with tabindex is -1 when set disabled', () => {
    button.toggleAttribute('disabled')
    expect(button).to.have.attribute('tabindex', '-1')
  })

  describe('form', function () {
    // TODO: wait for https://github.com/open-wc/open-wc/pull/2422
    it.skip('should can submit the form', async () => {
      const form = await fixture(html`
        <form>
          <max-button type="submit">Submit</max-button>
        </form>
      `)
      const button = form.querySelector<Button>('max-button')
      button.click()
      const { type } = (await oneEvent(form, 'submit')) as SubmitEvent
      expect(type).to.be.eq('submit')
    })

    it('should can reset the form', async () => {
      const form = await fixture(`
        <form>
          <max-button type="reset">Reset</max-button>
        </form>
      `)
      const button = form.querySelector<Button>('max-button')
      // TODO: @eslint-config overwrite test file
      // eslint-disable-next-line max-nested-callbacks
      setTimeout(() => {
        button.click()
      })
      const { type } = await oneEvent(form, 'reset')
      expect(type).to.be.eq('reset')
    })
  })

  describe('ripple', () => {
    it('should have <max-ripple /> element', () => {
      expect(button.shadowRoot.querySelector('max-ripple')).to.not.be.undefined
    })
  })
})
