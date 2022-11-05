import { elementUpdated, expect, fixture } from '@open-wc/testing'
import Checkbox from '../Checkbox'
import Ripple from '../../Ripple/Ripple'
import '..'

describe('testing <max-checkbox />', () => {
  let checkbox: Checkbox

  beforeEach(async () => {
    checkbox = await fixture('<max-checkbox>checkbox</max-checkbox>')
  })

  afterEach(() => {
    checkbox = null
  })

  it('custom elements should be defined', () => {
    const checkbox = window.customElements.get(Checkbox.is)
    expect(checkbox).to.not.undefined
  })

  describe('snapshots', () => {
    const tests = [
      { attribute: 'color', value: 'primary' },
      { attribute: 'color', value: 'secondary' },
      { attribute: 'indeterminate', value: 'indeterminate' },
      { attribute: 'checked', value: 'checked' },
      { attribute: 'disabled', value: 'disabled' },
    ]

    tests.forEach(({ attribute, value }) => {
      it(`should render a button with ${attribute} is ${value}`, async () => {
        checkbox.setAttribute(attribute, value)
        await expect(checkbox).dom.to.equalSnapshot()
      })

      if (['checked', 'disabled'].includes(attribute)) {
        it(`${attribute} shadowRoot`, async () => {
          checkbox.setAttribute(attribute, value)
          await expect(checkbox).shadowDom.to.equalSnapshot()
        })
      }
    })
  })

  it('aria-checked is mixed', async () => {
    checkbox.toggleAttribute('indeterminate', true)
    expect(checkbox).to.have.property('indeterminate', true)
    expect(checkbox).to.have.attribute('aria-checked', 'mixed')
    checkbox.indeterminate = false
    expect(checkbox).to.have.attribute('aria-checked', 'false')
  })

  it('aria-checked is true', () => {
    checkbox.toggleAttribute('checked', true)
    expect(checkbox).to.have.property('checked', true)
    expect(checkbox).to.have.attribute('aria-checked', 'true')
    checkbox.checked = false
    expect(checkbox).to.have.attribute('aria-checked', 'false')
  })

  it('disabled', () => {
    checkbox.toggleAttribute('disabled', true)
    expect(checkbox).to.have.property('disabled', true)
    expect(checkbox).to.have.attribute('aria-disabled', 'true')
    expect(checkbox).to.have.attribute('tabindex', '-1')
    checkbox.disabled = false
    expect(checkbox).to.have.attribute('aria-disabled', 'false')
    expect(checkbox).to.have.attribute('tabindex', '0')
  })

  it('role is checkbox', () => {
    expect(checkbox).to.have.attribute('role', 'checkbox')
  })

  it('tabindex is 0', () => {
    expect(checkbox).to.have.attribute('tabindex', '0')
  })

  it('event', () => {
    checkbox.click()
    expect(checkbox).to.have.attribute('checked')

    checkbox.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: ' ',
      })
    )

    expect(checkbox).to.have.property('checked', false)
  })

  it('ripple', () => {
    const ripple = checkbox.shadowRoot.querySelector(Ripple.is)
    expect(ripple).to.be.not.undefined
  })
})
