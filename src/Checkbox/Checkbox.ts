import styles from './checkbox.style.css' assert { type: 'css' }
import type Ripple from '../Ripple/Ripple'
import '../Ripple'

export default class Checkbox extends HTMLElement {
  static is = 'max-checkbox'

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets.push(styles)

    this.shadowRoot.innerHTML = `
      <div part="icon-wrapper">
        <div part="icon"></div>
        <max-ripple center></max-ripple>
      </div>
      <slot></slot>
    `
  }

  get #rippleRoot() {
    return this.shadowRoot.querySelector<Ripple>('max-ripple')
  }

  // ---------- attributes ------------------
  get checked() {
    return this.hasAttribute('checked')
  }
  set checked(checked) {
    this.toggleAttribute('checked', checked)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }
  set disabled(disabled) {
    this.toggleAttribute('disabled', disabled)
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate')
  }
  set indeterminate(indeterminate) {
    this.toggleAttribute('indeterminate', indeterminate)
  }
  // ---------- attributes ------------------

  static get observedAttributes() {
    return ['checked', 'indeterminate', 'disabled']
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (oldValue === newValue) return

    const hasValue = newValue !== null
    if (attribute === 'checked') {
      this.#handleCheckedChanged(hasValue)
    } else if (attribute === 'disabled') {
      this.#handleDisabledChanged(hasValue)
    } else if (attribute === 'indeterminate') {
      this.#handleIndeterminateChanged(hasValue)
    }
  }

  connectedCallback() {
    this.#listenRippleEvent()
    this.#initializeAttributes()

    this.addEventListener('click', () => {
      this.#toggleChecked()
    })

    this.addEventListener('keyup', (event) => {
      if (event.key === ' ') {
        this.#toggleChecked()
      }
    })
  }

  #toggleChecked() {
    this.checked = this.indeterminate || !this.checked
  }

  #handleCheckedChanged(checked: boolean) {
    this.ariaChecked = String(checked)
  }

  #handleDisabledChanged(disabled: boolean) {
    this.ariaDisabled = String(disabled)
    this.tabIndex = disabled ? -1 : 0
  }

  #handleIndeterminateChanged(indeterminate: boolean) {
    this.ariaChecked = indeterminate ? 'mixed' : String(this.checked)
  }

  #listenRippleEvent() {
    if (!this.#rippleRoot?.start) return

    this.addEventListener('mousedown', ({ clientX, clientY }) => {
      this.#rippleRoot.start({ clientX, clientY })
    })

    this.addEventListener('focus', () => {
      if (this.matches(':focus-visible')) {
        this.#rippleRoot.start({ pulsate: true })
      }
    })

    let pressing = false
    this.addEventListener('keydown', ({ key }) => {
      if (key === ' ' && !pressing) {
        pressing = true
        this.#rippleRoot.start({ center: true })
      }
    })

    this.addEventListener('keyup', ({ key }) => {
      if (key === ' ') {
        pressing = false
        this.#rippleRoot.stop()
      }
    })

    this.addEventListener('mouseup', () => {
      this.#rippleRoot.stop()
    })

    this.addEventListener('mouseleave', () => {
      this.#rippleRoot.stop()
    })

    this.addEventListener('blur', () => {
      this.#rippleRoot.stop(true)
    })
  }

  #initializeAttributes() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'checkbox')
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0')
    }
  }
}
