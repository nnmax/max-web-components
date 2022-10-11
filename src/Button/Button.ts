import type Ripple from '../Ripple/Ripple'
import styles from './button.style.css' assert { type: 'css' }
import '../Ripple'

export default class Button extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets.push(styles)
  }

  get #rippleRoot() {
    return this.shadowRoot.querySelector<Ripple>('max-ripple')
  }

  // --------- attributes ----------
  static get observedAttributes() {
    return ['disabled', 'type']
  }

  get #disabled() {
    return this.getAttribute('disabled') !== null
  }
  get #type() {
    return this.getAttribute('type') || 'button'
  }
  // --------- attributes ----------

  attributeChangedCallback() {
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
      const button = this.shadowRoot.querySelector('button')
      if (button.matches(':focus-visible')) {
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
    const tabindex = this.#disabled ? -1 : 0

    this.shadowRoot.innerHTML = `
      <button
        ${this.#disabled ? 'disabled' : ''}
        type="${this.#type}"
        tabindex=${tabindex}
      >
        <slot></slot>
        <max-ripple></max-ripple>
      </button>
    `

    if (this.#disabled) {
      this.style.pointerEvents = 'none'
    } else {
      this.style.pointerEvents = 'initial'
    }
  }
}
