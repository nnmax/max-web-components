import styles from './styles/accordion.css' assert { type: 'css' }
import AccordionPanel from './AccordionPanel'

export default class Accordion extends HTMLElement {
  static is = 'max-accordion'

  panels: AccordionPanel[]

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
    container.addEventListener('expanded-changed', (event) => {
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
    })
  }

  #handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.panels = this.#filterPanels(slot.assignedNodes())
  }

  #handleKeyDown(event: KeyboardEvent) {
    const { key, metaKey, altKey } = event

    if (metaKey || altKey || !this.panels) return

    const focusedIndex = this.panels.findIndex((node) => node.hasAttribute('focused'))
    const length = this.panels.length
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

    if (index >= 0) {
      this.#focusItem(index)
    }
  }

  #focusItem(index: number) {
    this.panels[index].focusButton()
  }

  #filterPanels(nodes: Node[]): AccordionPanel[] {
    if (Array.isArray(nodes)) {
      return nodes.filter((node) => node instanceof AccordionPanel && !node.disabled) as AccordionPanel[]
    }
    return []
  }
}
