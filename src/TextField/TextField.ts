import styles from './style.css' assert { type: 'css' }
import Ripple from '../Ripple/Ripple'
import '../Ripple'

export default class TextField extends HTMLElement {
  static is = 'max-text-field'
  static formAssociated = true
  // TODO: remove this command
  // eslint-disable-next-line no-unused-private-class-members
  #internals: ElementInternals

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.#internals = this.attachInternals()
    this.shadowRoot.adoptedStyleSheets.push(styles)
    this.shadowRoot.innerHTML = `
      <label part="label" for="input"></label>
      <div part="input-container">
        <input part="input" type="text" id="input">
        <max-ripple></max-ripple>
      </div>
      <div part="helper-text"></div>
    `

    const hasAriaLabel = this.hasAttribute('aria-label') || this.hasAttribute('aria-labelledby')
    this.#hasDefaultAriaLabel = hasAriaLabel
  }

  get #rippleRoot() {
    return this.shadowRoot.querySelector<Ripple>('max-ripple')
  }
  get #input() {
    return this.shadowRoot.querySelector('input')
  }

  #value = this.getAttribute('value')
  get value() {
    return this.#value
  }
  set value(newValue) {
    this.#value = newValue
  }

  get #required() {
    return this.hasAttribute('required')
  }

  #hasDefaultAriaLabel = false

  static get observedAttributes() {
    return ['label', 'placeholder', 'helper-text', 'maxlength', 'minlength', 'required']
  }

  attributeChangedCallback(attribute, _, newValue) {
    if (attribute === 'label') {
      const hasLabel = newValue !== null
      if (!this.#hasDefaultAriaLabel && hasLabel) {
        this.setAttribute('aria-label', newValue)
      }
      const labelElement = this.shadowRoot.querySelector('label')
      labelElement.textContent = newValue
    }
    if (attribute === 'placeholder') {
      this.#input.placeholder = newValue
    }
    if (attribute === 'minlength') {
      this.#input.minLength = newValue
    }
    if (attribute === 'maxlength') {
      this.#input.maxLength = newValue
    }
    if (attribute === 'helper-text') {
      this.#setHelperText(newValue)
    }
    if (attribute === 'required') {
      this.#internals.ariaRequired = String(newValue !== null)
    }
  }

  connectedCallback() {
    this.#listenRippleEvent()
    this.#listenUserEvent()
  }

  #listenRippleEvent() {
    this.addEventListener('mousedown', ({ clientX, clientY }) => {
      this.#rippleRoot.start({ clientX, clientY })
    })
    const helperText = this.shadowRoot.querySelector('[part="helper-text"]')
    helperText.addEventListener('mousedown', (event) => {
      event.stopPropagation()
    })
    this.addEventListener('mouseup', () => {
      this.#rippleRoot.stop()
    })

    this.addEventListener('mouseleave', () => {
      this.#rippleRoot.stop()
    })
  }

  #listenUserEvent() {
    this.addEventListener('focus', this.#handleFocus)
    this.addEventListener('blur', this.#handleBlur)
    this.#input.addEventListener('input', this.#handleInput.bind(this))
  }

  #handleFocus() {
    this.toggleAttribute('focused', true)
  }
  #handleBlur() {
    this.toggleAttribute('focused', false)

    if (this.#required && !this.value) {
      this.#internals.setValidity({ valueMissing: true }, 'This field is required')
      this.#setHelperText(this.#internals.validationMessage)
    } else {
      this.#internals.setValidity({})
      this.#setHelperText()
    }
  }
  #handleInput(event: Event) {
    const { value } = event.target as HTMLInputElement
    this.value = value
    this.#internals.setFormValue(value)
  }

  #setHelperText(text?: string) {
    const helper = this.shadowRoot.querySelector('div[part="helper-text"]')
    if (text === undefined) {
      text = this.getAttribute('helper-text')
    }
    helper.textContent = text
  }

  // call focus method to not trigger focusEvent
  focus(options?: FocusOptions): void {
    super.focus(options)
    this.dispatchEvent(
      new FocusEvent('focus', {
        cancelable: true,
        bubbles: false,
      })
    )
  }

  // call blur method to not trigger blurEvent
  blur(): void {
    super.blur()
    this.dispatchEvent(
      new FocusEvent('blur', {
        cancelable: true,
        bubbles: false,
      })
    )
  }
}
