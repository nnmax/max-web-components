import type Ripple from '../Ripple/Ripple'
import styles from './button.style.css' assert { type: 'css' }
import '../Ripple'

type ButtonType = 'button' | 'submit' | 'reset'

export default class Button extends HTMLElement {
  static formAssociated = true

  #internals: ElementInternals

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [styles]
    this.#internals = this.attachInternals()
  }

  get #rippleRoot() {
    return this.shadowRoot.querySelector<Ripple>('max-ripple')
  }

  // --------- attributes ----------
  static get observedAttributes() {
    return ['aria-disabled', 'type']
  }

  get #disabled() {
    return this.hasAttribute('aria-disabled')
  }

  get #type() {
    return (this.getAttribute('type') as ButtonType) || 'button'
  }
  // --------- attributes ----------

  connectedCallback() {
    this.#render()
    this.#listenClickEvent()
    this.#listenRippleEvent()
    this.#initializeAttributes()
  }

  #initializeAttributes() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button')
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', this.#disabled ? '-1' : '0')
    }
  }

  #listenClickEvent() {
    this.addEventListener('click', () => {
      if (this.#type === 'submit') {
        this.#internals.form?.submit()
      }
      if (this.#type === 'reset') {
        this.#internals.form?.reset()
      }
    })
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
    this.shadowRoot.innerHTML = `
      <button>
        <slot></slot>
        <max-ripple></max-ripple>
      </button>
    `
  }
}
