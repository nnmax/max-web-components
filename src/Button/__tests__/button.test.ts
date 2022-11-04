import { elementUpdated, expect, fixture, oneEvent } from '@open-wc/testing'
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
      it(`should render a button with ${attribute} is ${value}`, () => {
        button.setAttribute(attribute, value)
        expect(button).dom.to.equalSnapshot()
      })
    })
  })

  it('when set disabled attribute, should also set aria-disabled attrubute', async () => {
    button.toggleAttribute('disabled', true)
    await elementUpdated(button)
    expect(button).to.have.attribute('disabled')
    expect(button).to.have.property('disabled', true)
    expect(button).to.have.attribute('aria-disabled')
    expect(button).to.have.property('ariaDisabled', 'true')

    button.disabled = false
    await elementUpdated(button)
    expect(button).to.not.have.attribute('disabled')
    expect(button).to.have.property('disabled', false)
    expect(button).to.have.attribute('aria-disabled', 'false')
    expect(button).to.have.property('ariaDisabled', 'false')
  })

  it('should render a button with role is `button`', () => {
    expect(button).to.have.attribute('role', 'button')
  })

  it('should render a button with tabindex is 0', () => {
    expect(button).to.have.property('tabIndex', 0)
    expect(button).to.have.attribute('tabindex', '0')
  })

  it('should render a button with tabindex is -1 when set disabled', async () => {
    const button = await fixture(`<max-button disabled>Button</max-button>`)
    expect(button).to.have.attribute('tabindex', '-1')
    expect(button).to.have.property('tabIndex', -1)
  })

  describe('form', () => {
    // TODO: wait for https://github.com/open-wc/open-wc/pull/2422
    it.skip('should can submit the form', async () => {
      const form = await fixture(`
        <form>
          <max-button type="submit">Submit</max-button>
        </form>
      `)
      const button = form.querySelector<Button>('max-button')
      setTimeout(() => {
        button.click()
      })
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
      setTimeout(() => {
        button.click()
      })
      const { type } = (await oneEvent(form, 'reset')) as Event
      expect(type).to.be.eq('reset')
    })
  })

  describe('ripple', () => {
    it('should have <max-ripple /> element', () => {
      expect(button.shadowRoot.querySelector('max-ripple')).to.not.be.undefined
    })
  })
})
