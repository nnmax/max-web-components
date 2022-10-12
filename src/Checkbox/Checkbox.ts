import styles from './checkbox.style.css' assert { type: 'css' }
import type Ripple from '../Ripple/Ripple'
import '../Ripple'

export default class Checkbox extends HTMLElement {
  static formAssociated = true

  #internals: ElementInternals

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets.push(styles)
    this.#internals = this.attachInternals()
  }

  get #rippleRoot() {
    return this.shadowRoot.querySelector<Ripple>('max-ripple')
  }

  get #input() {
    return this.shadowRoot.querySelector('input')
  }

  // ---------- attributes ------------------
  get value() {
    return this.getAttribute('value') || 'on'
  }
  get name() {
    return this.getAttribute('name')
  }
  get checked() {
    return this.hasAttribute('checked')
  }
  set checked(checked) {
    this.toggleAttribute('checked', checked)
  }

  get #disabled() {
    return this.hasAttribute('disabled')
  }
  // ---------- attributes ------------------

  static get observedAttributes() {
    return ['value', 'checked', 'name', 'indeterminate', 'disabled']
  }

  attributeChangedCallback(attribute, _, newValue) {
    if (attribute === 'indeterminate') {
      const hasIndeterminate = newValue !== null
      if (this.#input) this.#input.indeterminate = hasIndeterminate
      this.setAttribute('aria-checked', hasIndeterminate ? 'mixed' : String(this.checked))
    }
    if (attribute === 'checked') {
      const hasChecked = newValue !== null
      this.#internals.setFormValue(hasChecked ? this.value : undefined, hasChecked ? 'checked' : undefined)
      this.setAttribute('aria-checked', String(hasChecked))
      if (this.#input) this.#input.checked = hasChecked
    }
    if (attribute === 'value') {
      this.#internals.setFormValue(this.checked ? this.value : undefined, this.checked ? 'checked' : undefined)
    }
    if (attribute === 'disabled') {
      const hasDisabled = newValue !== null
      this.setAttribute('aria-disabled', String(hasDisabled))
      this.#input?.toggleAttribute('disabled', hasDisabled)
    }
  }

  connectedCallback() {
    this.#render()
    this.#listenInputEvent()
    this.#listenRippleEvent()
    this.#initializeAttributes()
  }

  #listenRippleEvent() {
    if (!this.#rippleRoot?.start) return

    this.addEventListener('mousedown', ({ clientX, clientY }) => {
      this.#rippleRoot.start({ clientX, clientY })
    })

    this.addEventListener('focus', () => {
      if (this.#input.matches(':focus-visible')) {
        this.#rippleRoot.start({ pulsate: true })
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

  #listenInputEvent() {
    if (!this.#input) return

    this.#input.addEventListener('input', (event) => {
      this.checked = (event.target as HTMLInputElement).checked
    })
  }

  #initializeAttributes() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'checkbox')
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', this.#disabled ? '-1' : '0')
    }
  }

  #render() {
    this.shadowRoot.innerHTML = `
      <label>
        <div class="input-wrapper">
          <input type="checkbox" tabindex="-1">
          <max-ripple center></max-ripple>
        </div>
        <slot></slot>
      </label>
    `
  }
}
