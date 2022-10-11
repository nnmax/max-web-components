import styles from './checkbox.style.css' assert { type: 'css' }
import type Ripple from '../Ripple/Ripple'
import '../Ripple'
import { insertAttributeToHTML } from '../utils'

export default class Checkbox extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets.push(styles)
  }

  get #rippleRoot() {
    return this.shadowRoot.querySelector<Ripple>('max-ripple')
  }

  get #input() {
    return this.shadowRoot.querySelector('input')
  }

  // ---------- attributes ------------------
  get value() {
    return this.getAttribute('value')
  }
  get checked() {
    return this.getAttribute('checked')
  }
  get name() {
    return this.getAttribute('name')
  }
  get indeterminate() {
    return this.getAttribute('indeterminate')
  }
  // ---------- attributes ------------------

  static get observedAttributes() {
    return ['value', 'checked', 'name', 'indeterminate']
  }

  attributeChangedCallback(attribute, _, newValue) {
    if (attribute === 'indeterminate') {
      this.#input.indeterminate = newValue !== null
      return
    }
    this.#render()
  }

  connectedCallback() {
    this.#render()
    this.#listenRippleEvent()
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
      this.#rippleRoot.stop()
    })
  }

  #render() {
    this.shadowRoot.innerHTML = `
      <label>
        <div class="input-wrapper">
          <input
            ${insertAttributeToHTML({
              type: 'checkbox',
              value: this.value,
              checked: this.checked,
              name: this.name,
            })}
          >
          <max-ripple center></max-ripple>
        </div>
        <slot></slot>
      </label>
    `
  }
}
