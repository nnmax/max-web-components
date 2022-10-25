/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["testing AccordionPanel snapshots basic"] = 
`<max-accordion-panel>
  <div slot="heading">
    Title
  </div>
  <div>
    Content
  </div>
</max-accordion-panel>
`;
/* end snapshot testing AccordionPanel snapshots basic */

snapshots["testing AccordionPanel snapshots expanded"] = 
`<max-accordion-panel expanded="">
  <div slot="heading">
    Title
  </div>
  <div>
    Content
  </div>
</max-accordion-panel>
`;
/* end snapshot testing AccordionPanel snapshots expanded */

snapshots["testing AccordionPanel snapshots disabled"] = 
`<max-accordion-panel disabled="">
  <div slot="heading">
    Title
  </div>
  <div>
    Content
  </div>
</max-accordion-panel>
`;
/* end snapshot testing AccordionPanel snapshots disabled */

snapshots["testing AccordionPanel snapshots expanded & disabled"] = 
`<max-accordion-panel
  disabled=""
  expanded=""
>
  <div slot="heading">
    Title
  </div>
  <div>
    Content
  </div>
</max-accordion-panel>
`;
/* end snapshot testing AccordionPanel snapshots expanded & disabled */

snapshots["testing AccordionPanel snapshots basic shadowDom"] = 
`<div part="panel">
  <div
    part="heading"
    role="heading"
  >
    <div
      aria-expanded="false"
      part="heading-button"
      role="button"
      tabindex="0"
    >
      <slot name="heading">
      </slot>
    </div>
  </div>
  <div part="content-wrapper">
    <div part="content">
      <slot>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot testing AccordionPanel snapshots basic shadowDom */

snapshots["testing AccordionPanel snapshots expanded shadowDom"] = 
`<div part="panel">
  <div
    part="heading"
    role="heading"
  >
    <div
      aria-expanded="true"
      part="heading-button"
      role="button"
      tabindex="0"
    >
      <slot name="heading">
      </slot>
    </div>
  </div>
  <div part="content-wrapper">
    <div part="content">
      <slot>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot testing AccordionPanel snapshots expanded shadowDom */

snapshots["testing AccordionPanel snapshots disabled shadowDom"] = 
`<div part="panel">
  <div
    part="heading"
    role="heading"
  >
    <div
      aria-disabled="true"
      aria-expanded="false"
      part="heading-button"
      role="button"
      tabindex="-1"
    >
      <slot name="heading">
      </slot>
    </div>
  </div>
  <div part="content-wrapper">
    <div part="content">
      <slot>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot testing AccordionPanel snapshots disabled shadowDom */

snapshots["testing AccordionPanel snapshots expanded & disabled shadowDom"] = 
`<div part="panel">
  <div
    part="heading"
    role="heading"
  >
    <div
      aria-controls="accordion-panel-7"
      aria-disabled="true"
      aria-expanded="true"
      part="heading-button"
      role="button"
      tabindex="-1"
    >
      <slot name="heading">
      </slot>
    </div>
  </div>
  <div part="content-wrapper">
    <div
      id="accordion-panel-7"
      part="content"
    >
      <slot>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot testing AccordionPanel snapshots expanded & disabled shadowDom */

