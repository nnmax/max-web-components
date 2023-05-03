/* eslint-disable @typescript-eslint/no-shadow */
import { expect, fixture } from '@open-wc/testing'
import TextField from '../TextField'
import '..'
import Ripple from '../../Ripple/Ripple'

describe('testing <max-text-field /> >>', () => {
  let textField: TextField

  beforeEach(async () => {
    textField = await fixture('<max-text-field></max-text-field>')
  })

  it('custom elements should be defined >>', () => {
    const textField = window.customElements.get(TextField.is)
    expect(textField).to.be.not.undefined
  })

  describe('snapshots >>', () => {
    it('with label', async () => {
      textField.setAttribute('label', 'label')
      await expect(textField).dom.to.equalSnapshot()
    })

    it('with label in shadowDom', async () => {
      textField.setAttribute('label', 'label')
      await expect(textField).shadowDom.to.equalSnapshot()
    })

    it('with placeholder in shadowDom', async () => {
      textField.setAttribute('placeholder', 'placeholder')
      await expect(textField).shadowDom.to.equalSnapshot()
    })

    it('with helper-text in shadowDom', async () => {
      textField.setAttribute('helper-text', 'helper-text')
      await expect(textField).shadowDom.to.equalSnapshot()
    })
  })

  it('without aria-label', () => {
    textField.setAttribute('label', 'label')
    expect(textField).to.have.attribute('aria-label', 'label')
  })

  it('with aria-label', async () => {
    const textField = await fixture('<max-text-field aria-label="aria-label"></max-text-field>')
    textField.setAttribute('label', 'label')
    expect(textField).to.have.attribute('aria-label', 'aria-label')
  })

  it('with aria-labelledby', async () => {
    const textField = await fixture('<max-text-field aria-labelledby="labelledby"></max-text-field>')
    textField.setAttribute('label', 'label')
    expect(textField).to.have.attribute('aria-labelledby', 'labelledby')
  })

  it('with placeholder', () => {
    textField.setAttribute('placeholder', 'placeholder')
    const placeholder = textField.shadowRoot.querySelector('input').placeholder
    expect(placeholder).to.be.eq('placeholder')
  })

  it('with helper-text', () => {
    textField.setAttribute('helper-text', 'foo')
    const placeholder = textField.shadowRoot.innerHTML
    expect(placeholder).to.be.contain('foo')
  })

  it('focus and blur events', () => {
    textField.focus()
    expect(textField).to.have.attribute('focused')
    textField.blur()
    expect(textField).to.have.not.attribute('focused')
  })

  it('ripple', () => {
    const ripple = textField.shadowRoot.querySelector(Ripple.is)
    expect(ripple).to.be.not.undefined
  })

  it('maxlength and minlength', () => {
    textField.setAttribute('maxlength', '10')
    textField.setAttribute('minlength', '1')
    const input = textField.shadowRoot.querySelector('input')
    expect(input).to.have.attribute('maxlength', '10')
    expect(input).to.have.attribute('minlength', '1')
  })
})
