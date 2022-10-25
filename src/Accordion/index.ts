import Accordion from './Accordion'
import AccordionPanel from './AccordionPanel'

if (!window.customElements.get(Accordion.is)) {
  window.customElements.define(Accordion.is, Accordion)
}

if (!window.customElements.get(AccordionPanel.is)) {
  window.customElements.define(AccordionPanel.is, AccordionPanel)
}
