/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["testing <max-text-field /> >> snapshots >> with label"] = 
`<max-text-field
  aria-label="label"
  label="label"
>
</max-text-field>
`;
/* end snapshot testing <max-text-field /> >> snapshots >> with label */

snapshots["testing <max-text-field /> >> snapshots >> with label in shadowDom"] = 
`<label
  for="input"
  part="label"
>
  label
</label>
<div part="input-container">
  <input
    id="input"
    part="input"
    type="text"
  >
  <max-ripple>
  </max-ripple>
</div>
<div part="helper-text">
</div>
`;
/* end snapshot testing <max-text-field /> >> snapshots >> with label in shadowDom */

snapshots["testing <max-text-field /> >> snapshots >> with placeholder in shadowDom"] = 
`<label
  for="input"
  part="label"
>
</label>
<div part="input-container">
  <input
    id="input"
    part="input"
    placeholder="placeholder"
    type="text"
  >
  <max-ripple>
  </max-ripple>
</div>
<div part="helper-text">
</div>
`;
/* end snapshot testing <max-text-field /> >> snapshots >> with placeholder in shadowDom */

snapshots["testing <max-text-field /> >> snapshots >> with helper-text in shadowDom"] = 
`<label
  for="input"
  part="label"
>
</label>
<div part="input-container">
  <input
    id="input"
    part="input"
    type="text"
  >
  <max-ripple>
  </max-ripple>
</div>
<div part="helper-text">
  helper-text
</div>
`;
/* end snapshot testing <max-text-field /> >> snapshots >> with helper-text in shadowDom */

