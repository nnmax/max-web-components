import styles from './checkbox.style.css' assert { type: 'css' }
import type Ripple from '../Ripple/Ripple'
import '../Ripple'
import { insertAttributeToHTML } from '../utils'

export default class Checkbox extends HTMLElement {
  static formAssociated = true
  static is = 'max-checkbox'
  #internals: ElementInternals

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets.push(styles)
    this.#internals = this.attachInternals()

    this.#render()
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
  // ---------- attributes ------------------

  static get observedAttributes() {
    return ['value', 'checked', 'indeterminate', 'disabled']
  }

  attributeChangedCallback(attribute, _, newValue) {
    if (attribute === 'indeterminate') {
      const hasIndeterminate = newValue !== null
      this.#input.indeterminate = hasIndeterminate
      this.setAttribute('aria-checked', hasIndeterminate ? 'mixed' : String(this.checked))
    }
    if (attribute === 'checked') {
      const hasChecked = newValue !== null
      this.#internals.setFormValue(hasChecked ? this.value : undefined, hasChecked ? 'checked' : undefined)
      this.setAttribute('aria-checked', String(hasChecked))
      this.#input.checked = hasChecked
    }
    if (attribute === 'value') {
      this.#internals.setFormValue(this.checked ? this.value : undefined, this.checked ? 'checked' : undefined)
    }
    if (attribute === 'disabled') {
      const hasDisabled = newValue !== null
      this.setAttribute('aria-disabled', String(hasDisabled))
      this.setAttribute('tabindex', hasDisabled ? '-1' : '0')
      this.#input.disabled = hasDisabled
    }
  }

  connectedCallback() {
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
        this.checked = !this.checked
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

  #listenInputEvent() {
    this.#input.addEventListener('input', (event) => {
      this.checked = (event.target as HTMLInputElement).checked
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

  #render() {
    this.shadowRoot.innerHTML = `
      <label>
        <div class="input-wrapper">
          <input type="checkbox" tabindex="-1" ${insertAttributeToHTML({
            checked: this.getAttribute('checked'),
            disabled: this.getAttribute('disabled'),
          })}>
          <max-ripple center></max-ripple>
        </div>
        <slot></slot>
      </label>
    `
  }
}
