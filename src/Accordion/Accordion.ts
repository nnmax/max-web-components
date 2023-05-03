import styles from './styles/accordion.css' assert { type: 'css' }
import AccordionPanel from './AccordionPanel'

export default class Accordion extends HTMLElement {
  static is = 'max-accordion'

  panels: AccordionPanel[]

  static get observedAttributes() {
    return ['heading-level']
  }

  get headingLevel() {
    return this.getAttribute('heading-level')
  }
  set headingLevel(headingLevel) {
    this.setAttribute('heading-level', headingLevel)
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets.push(styles)
    this.shadowRoot.innerHTML = `
      <div part="container">
        <slot></slot>
      </div>
    `
  }

  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot')
    slot.addEventListener('slotchange', this.#handleSlotChange.bind(this))
    this.addEventListener('keydown', this.#handleKeyDown.bind(this))
    const container = this.shadowRoot.querySelector<HTMLDivElement>('div[part=container]')
    container.addEventListener('expanded-changed', this.#handleExpandedChanged.bind(this))
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (oldValue === newValue) return

    if (attribute === 'heading-level') {
      this.headingLevel = newValue
      this.#injectHeadingLevel(newValue)
    }
  }

  #injectHeadingLevel(headingLevel: string) {
    if (headingLevel && this.panels) {
      this.panels.forEach((panel) => {
        panel.headingLevel = headingLevel
      })
    }
  }

  #handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    const elements = slot.assignedElements()
    this.panels = this.#filterPanels(elements)
    this.#injectHeadingLevel(this.headingLevel)
  }

  #handleExpandedChanged(event: CustomEvent<{ value: boolean }>) {
    event.stopPropagation()
    this.dispatchEvent(
      new CustomEvent('expanded-changed', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
          value: this.panels.map((panel) => panel.expanded),
        },
      })
    )
  }

  #handleKeyDown(event: KeyboardEvent) {
    const { key, metaKey, altKey } = event

    if (metaKey || altKey || !this.panels) return

    const enable = this.panels.filter((panel) => !panel.disabled)
    const focusedIndex = enable.findIndex((node) => node.hasAttribute('focused'))
    const length = enable.length
    const nextIndex = this.#getFocusIndex(focusedIndex, key, length)

    if (nextIndex >= 0 || nextIndex <= length) {
      // TODO: fix: Uncaught TypeError: enable[nextIndex] is undefined
      enable[nextIndex].focusButton()
    }
  }

  #getFocusIndex(focusedIndex: number, key: string, length: number) {
    let index = -1

    if (focusedIndex === -1) return
    if (key === 'ArrowDown') {
      index = (focusedIndex + 1) % length
    }
    if (key === 'ArrowUp') {
      index = focusedIndex === 0 ? length - 1 : (focusedIndex - 1) % length
    }
    if (key === 'Home') {
      index = 0
    }
    if (key === 'End') {
      index = length - 1
    }

    return index
  }

  #filterPanels(elements: Element[]): AccordionPanel[] {
    if (Array.isArray(elements)) {
      return elements.filter((element) => element instanceof AccordionPanel) as AccordionPanel[]
    }
    return []
  }
}
