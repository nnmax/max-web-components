import { expect, fixture } from '@open-wc/testing'
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

  it('should have get value, name and checked properties', async () => {
    const checkbox = await fixture<Checkbox>('<max-checkbox value="foo" name="my-checkbox" checked></max-checkbox>')
    expect(checkbox.value).to.be.eq('foo')
    expect(checkbox.name).to.be.eq('my-checkbox')
    expect(checkbox.checked).to.be.true
  })

  it('default value should be on', () => {
    expect(checkbox.value).to.be.eq('on')
  })

  it('aria-checked is mixed', () => {
    checkbox.toggleAttribute('indeterminate', true)
    expect(checkbox).to.have.attribute('aria-checked', 'mixed')
    const input = checkbox.shadowRoot.querySelector('input')
    expect(input.indeterminate).to.be.true
  })

  it('aria-checked is true', () => {
    checkbox.toggleAttribute('checked', true)
    expect(checkbox).to.have.attribute('aria-checked', 'true')
    const input = checkbox.shadowRoot.querySelector('input')
    expect(input.checked).to.be.true
  })

  it('disabled', () => {
    checkbox.toggleAttribute('disabled', true)
    expect(checkbox).to.have.attribute('aria-disabled', 'true')
    expect(checkbox).to.have.attribute('tabindex', '-1')
    const input = checkbox.shadowRoot.querySelector('input')
    expect(input.disabled).to.be.true
  })

  it('role is checkbox', () => {
    expect(checkbox).to.have.attribute('role', 'checkbox')
  })

  it('tabindex is 0', () => {
    expect(checkbox).to.have.attribute('tabindex', '0')
  })

  it('event', () => {
    const input = checkbox.shadowRoot.querySelector('input')
    input.click()
    expect(checkbox).to.have.attribute('checked')
  })

  it('ripple', () => {
    const ripple = checkbox.shadowRoot.querySelector(Ripple.is)
    expect(ripple).to.be.not.undefined
  })
})
