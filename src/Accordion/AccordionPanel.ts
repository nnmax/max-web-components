import { generateId } from '../utils'
import styles from './styles/accordion-panel.css' assert { type: 'css' }

export default class AccordionPanel extends HTMLElement {
  static is = 'max-accordion-panel'

  static get observedAttributes() {
    return ['disabled', 'expanded']
  }

  // -------- DOM -----------
  get #button() {
    return this.shadowRoot.querySelector<HTMLDivElement>('div[part=heading-button]')
  }
  get #contentContainer() {
    return this.shadowRoot.querySelector<HTMLDivElement>('div[part=content-wrapper]')
  }
  // -------- DOM -----------

  get expanded() {
    return this.hasAttribute('expanded')
  }
  set expanded(expanded) {
    this.#toggleExpanded(expanded)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }
  set disabled(disabled) {
    this.toggleAttribute('disabled', disabled)
  }

  get #contentHeight() {
    return `${this.shadowRoot.querySelector<HTMLDivElement>('div[part=content]').clientHeight}px`
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets.push(styles)
    const id = generateId('accordion-panel')
    this.shadowRoot.innerHTML = `
      <div part="panel">
        <div role="heading" part="heading">
          <div
            role="button"
            part="heading-button"
            tabindex="0"
            aria-controls=${id}
          >
            <slot name="heading"></slot>
          </div>
        </div>
        <div part="content-wrapper">
          <div part="content" id=${id}>
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }

  connectedCallback() {
    this.#button.addEventListener('click', this.#handleButtonClick.bind(this))
    this.#button.addEventListener('keydown', this.#handleKeyDown.bind(this))
    this.#button.addEventListener('focus', this.#handleFocus.bind(this))
    this.#button.addEventListener('blur', this.#handleBlur.bind(this))
    this.#button.ariaExpanded = String(this.expanded)
  }

  #handleButtonClick() {
    if (!this.disabled) {
      this.expanded = !this.expanded
    }
  }

  #toggleExpanded(expanded: boolean) {
    if (expanded) {
      this.#contentContainer.style.setProperty('--content-height', this.#contentHeight)
    }
    this.toggleAttribute('expanded', expanded)
    this.#button.ariaExpanded = String(expanded)
    this.dispatchEvent(
      new CustomEvent('expanded-changed', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
          value: expanded,
        },
      })
    )
  }

  #handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return

    const { key } = event
    if (key === ' ' || key === 'Enter') {
      this.expanded = !this.expanded
    }
  }

  #handleFocus() {
    this.toggleAttribute('focused', true)
  }

  #handleBlur() {
    this.toggleAttribute('focused', false)
  }

  focusButton() {
    this.#button.focus()
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (oldValue === newValue) return

    if (attribute === 'disabled') {
      this.#button.ariaDisabled = String(this.disabled)
      this.#button.tabIndex = this.disabled ? -1 : 0
    }
  }
}
