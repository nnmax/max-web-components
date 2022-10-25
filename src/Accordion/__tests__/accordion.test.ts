import type { DiffOptions } from '@open-wc/testing/node_modules/@open-wc/semantic-dom-diff/get-diffable-html'
import { elementUpdated, expect, fixture, oneEvent } from '@open-wc/testing'
import Accordion from '../Accordion'
import '..'
import AccordionPanel from '../AccordionPanel'

const options: DiffOptions = {
  ignoreAttributes: ['aria-controls', 'id'],
}

describe('testing Accordion', () => {
  let accordion: Accordion

  beforeEach(async () => {
    accordion = await fixture(`
      <max-accordion>
        <max-accordion-panel>
          <div slot="heading">Title 1</div>
          Content 1
        </max-accordion-panel>
        <max-accordion-panel>
          <div slot="heading">Title 2</div>
          Content 2
        </max-accordion-panel>
        <max-accordion-panel>
          <div slot="heading">Title 3</div>
          Content 3
        </max-accordion-panel>
      </max-accordion>
    `)
  })

  it('custom elements should be defined', () => {
    expect(window.customElements.get(Accordion.is)).to.be.not.undefined
  })

  describe('snapshots', () => {
    it('basic', () => {
      expect(accordion).dom.to.equalSnapshot(options)
    })

    it('shadowDom', () => {
      expect(accordion).shadowDom.to.equalSnapshot(options)
    })
  })

  it('should have a slot element', () => {
    const slots = accordion.shadowRoot.querySelectorAll('slot')
    expect(slots).to.have.lengthOf(1)
    expect(slots[0].assignedElements()).to.have.lengthOf(3)
  })

  it('should have panels property', () => {
    expect(accordion.panels).to.have.lengthOf(3)
  })

  it('should update panels property when slot changed', async () => {
    expect(accordion.panels[1].expanded).to.be.false
    const slot = accordion.shadowRoot.querySelector('slot')
    const elements = slot.assignedElements() as AccordionPanel[]
    elements[1].expanded = true
    expect(accordion.panels[1].expanded).to.be.true

    const panel = document.createElement('max-accordion-panel')
    panel.innerHTML = `
      <span slot="heading">Span Title</span>
      <p>Content</p>
    `
    accordion.appendChild(panel)

    await elementUpdated(panel)

    expect(accordion.panels).to.have.lengthOf(4)
  })

  it('should trigger expanded-changed event', async () => {
    setTimeout(() => {
      accordion.panels[1].expanded = true
    })
    const {
      detail: { value },
    } = await oneEvent(accordion, 'expanded-changed')
    await elementUpdated(accordion)
    expect(value).to.be.an('array')
    expect(value).to.deep.eq([false, true, false])
  })

  describe('keyboard', () => {
    const fireKeydown = (key: 'ArrowDown' | 'ArrowUp' | 'Home' | 'End') => {
      accordion.dispatchEvent(
        new KeyboardEvent('keydown', {
          key,
        })
      )
    }

    it('ArrowDown', () => {
      accordion.panels[1].disabled = true
      accordion.panels[0].focusButton()

      expect(accordion.panels[0]).dom.to.have.attribute('focused')

      fireKeydown('ArrowDown')

      expect(accordion.panels[0]).dom.to.have.not.attribute('focused')
      expect(accordion.panels[2]).dom.to.have.attribute('focused')

      fireKeydown('ArrowDown')

      expect(accordion.panels[2]).dom.to.have.not.attribute('focused')
      expect(accordion.panels[0]).dom.to.have.attribute('focused')
    })

    it('ArrowUp', () => {
      accordion.panels[1].disabled = true
      accordion.panels[0].focusButton()

      expect(accordion.panels[0]).dom.to.have.attribute('focused')

      fireKeydown('ArrowUp')

      expect(accordion.panels[0]).dom.to.have.not.attribute('focused')
      expect(accordion.panels[2]).dom.to.have.attribute('focused')

      fireKeydown('ArrowUp')

      expect(accordion.panels[2]).dom.to.have.not.attribute('focused')
      expect(accordion.panels[0]).dom.to.have.attribute('focused')
    })

    it('Home', () => {
      accordion.panels[0].disabled = true
      accordion.panels[2].focusButton()

      expect(accordion.panels[2]).dom.to.have.attribute('focused')

      fireKeydown('Home')

      expect(accordion.panels[2]).dom.to.have.not.attribute('focused')
      expect(accordion.panels[1]).dom.to.have.attribute('focused')
    })

    it('End', () => {
      accordion.panels[2].disabled = true
      accordion.panels[0].focusButton()

      expect(accordion.panels[0]).dom.to.have.attribute('focused')

      fireKeydown('End')

      expect(accordion.panels[0]).dom.to.have.not.attribute('focused')
      expect(accordion.panels[1]).dom.to.have.attribute('focused')
    })
  })
})
