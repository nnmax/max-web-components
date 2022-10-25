import { action } from '@storybook/addon-actions'
import type { Meta, Story } from '@storybook/web-components'
import { html } from 'lit-html'
import '..'

export default {
  title: 'Components/Accordion',
} as Meta

export const Basic: Story = () => html`
  <div style="padding: 30px; background: #E7EBF0;">
    <max-accordion @expanded-changed=${action('expanded-changed')}>
      <max-accordion-panel>
        <div slot="heading">Accordion Title 1</div>
        Accordion Content 1<br />
        Accordion Content 1<br />
        Accordion Content 1<br />
        Accordion Content 1<br />
        Accordion Content 1<br />
        Accordion Content 1<br />
        Accordion Content 1<br />
        Accordion Content 1<br />
      </max-accordion-panel>
      <max-accordion-panel disabled>
        <div slot="heading">Accordion Title 2</div>
        Accordion Content 2<br />
        Accordion Content 2<br />
        Accordion Content 2<br />
        Accordion Content 2<br />
        Accordion Content 2<br />
        Accordion Content 2<br />
        Accordion Content 2<br />
        Accordion Content 2<br />
      </max-accordion-panel>
      <max-accordion-panel>
        <div slot="heading">Accordion Title 3</div>
        Accordion Content 3<br />
        Accordion Content 3<br />
        Accordion Content 3<br />
        Accordion Content 3<br />
        Accordion Content 3<br />
        Accordion Content 3<br />
        Accordion Content 3<br />
        Accordion Content 3<br />
      </max-accordion-panel>
      <max-accordion-panel>
        <div slot="heading">Accordion Title 4</div>
        Accordion Content 4<br />
        Accordion Content 4<br />
        Accordion Content 4<br />
        Accordion Content 4<br />
        Accordion Content 4<br />
        Accordion Content 4<br />
        Accordion Content 4<br />
        Accordion Content 4<br />
      </max-accordion-panel>
    </max-accordion>
  </div>
`
