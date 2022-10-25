import type { DiffOptions } from '@open-wc/testing/node_modules/@open-wc/semantic-dom-diff/get-diffable-html'
import { expect, fixture, oneEvent } from '@open-wc/testing'
import AccordionPanel from '../AccordionPanel'
import '..'

const options: DiffOptions = {
  ignoreAttributes: ['aria-controls', 'id', 'style'],
}

describe('testing AccordionPanel', () => {
  let panel: AccordionPanel, button: HTMLDivElement

  beforeEach(async () => {
    panel = await fixture(`
      <max-accordion-panel>
        <div slot="heading">Title</div>
        <div>Content</div>
      </max-accordion-panel>
    `)
    button = panel.shadowRoot.querySelector('[role=button]')
  })

  it('custom elements should be defined', () => {
    expect(window.customElements.get(AccordionPanel.is)).to.be.not.undefined
  })

  describe('snapshots', () => {
    it('basic', () => {
      expect(panel).dom.to.equalSnapshot(options)
    })

    it('expanded', () => {
      panel.expanded = true
      expect(panel).dom.to.equalSnapshot(options)
    })

    it('disabled', () => {
      panel.disabled = true
      expect(panel).dom.to.equalSnapshot(options)
    })

    it('expanded & disabled', () => {
      panel.expanded = true
      panel.disabled = true
      expect(panel).dom.to.equalSnapshot(options)
    })

    it('basic shadowDom', () => {
      expect(panel).shadowDom.to.equalSnapshot(options)
    })

    it('expanded shadowDom', () => {
      panel.expanded = true
      expect(panel).shadowDom.to.equalSnapshot(options)
    })

    it('disabled shadowDom', () => {
      panel.disabled = true
      expect(panel).shadowDom.to.equalSnapshot(options)
    })

    it('expanded & disabled shadowDom', () => {
      panel.expanded = true
      panel.disabled = true
      expect(panel).shadowDom.to.equalSnapshot(options)
    })
  })

  it('should only have a slot named heading', () => {
    const slot = button.querySelector<HTMLSlotElement>('slot[name=heading]')
    expect(slot).to.be.an.instanceOf(HTMLSlotElement)
    expect(slot.assignedNodes()[0].textContent).to.be.eq('Title')
  })

  it('should have aria-disabled and tabindex', () => {
    expect(button.tabIndex).to.be.eq(0)
    expect(button.ariaDisabled).to.be.null
    panel.disabled = true
    expect(button.tabIndex).to.be.eq(-1)
    expect(button.ariaDisabled).to.be.eq('true')
  })

  it('should have aria-controls', () => {
    const controls = button.getAttribute('aria-controls')
    const content = panel.shadowRoot.querySelector(`#${controls}`)
    expect(controls).to.include('accordion-panel')
    expect(content).to.be.not.null
  })

  it('should have expanded', () => {
    expect(button.ariaExpanded).to.be.eq('false')
    panel.expanded = true
    expect(button.ariaExpanded).to.be.eq('true')
  })

  it('should have an role called heading element', () => {
    const heading = panel.shadowRoot.querySelector<HTMLDivElement>('[role=heading]')
    expect(heading.childElementCount).to.be.eq(1)
    expect(heading.firstElementChild).to.be.eq(button)
  })

  it('should have an slot element', () => {
    const slot = panel.shadowRoot.querySelector<HTMLSlotElement>('slot:not([name])')
    expect(slot).to.be.not.null
    expect(slot.assignedElements()[0].textContent).to.eq('Content')
  })

  it('should have expanded property', () => {
    panel.expanded = true
    expect(panel).dom.to.have.attribute('expanded')
    panel.expanded = false
    expect(panel).dom.to.have.not.attribute('expanded')

    panel.toggleAttribute('expanded', true)
    expect(panel).to.have.property('expanded', true)
    panel.toggleAttribute('expanded', false)
    expect(panel).to.have.property('expanded', false)
  })

  it('should have disabled property', () => {
    panel.disabled = true
    expect(panel).dom.to.have.attribute('disabled')
    panel.disabled = false
    expect(panel).dom.to.have.not.attribute('disabled')

    panel.toggleAttribute('disabled', true)
    expect(panel).to.have.property('disabled', true)
    panel.toggleAttribute('disabled', false)
    expect(panel).to.have.property('disabled', false)
  })

  it('should update expanded property when click button', () => {
    button.click()
    expect(panel.expanded).to.be.true
    expect(panel).dom.to.have.attribute('expanded')
    button.click()
    expect(panel.expanded).to.be.false
    expect(panel).dom.to.have.not.attribute('expanded')
  })

  it('should fire expanded-changed event', async () => {
    setTimeout(() => {
      button.click()
    })
    const event1 = await oneEvent(panel, 'expanded-changed')
    expect(event1.detail.value).to.be.true

    setTimeout(() => {
      button.click()
    })
    const event2 = await oneEvent(panel, 'expanded-changed')
    expect(event2.detail.value).to.be.false
  })

  it('should have focused attribute', () => {
    button.dispatchEvent(new FocusEvent('focus'))
    expect(panel).dom.to.have.attribute('focused')
    button.dispatchEvent(new FocusEvent('blur'))
    expect(panel).dom.to.have.not.attribute('focused')
  })

  it('should trigger to expanded', () => {
    button.dispatchEvent(new FocusEvent('focus'))
    button.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: ' ',
      })
    )
    expect(panel.expanded).to.be.true
    button.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      })
    )
    expect(panel.expanded).to.be.false
  })
})
