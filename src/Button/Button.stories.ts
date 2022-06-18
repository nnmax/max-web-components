import { Meta } from "@storybook/web-components";
import { html } from "lit";
import "./Button";

export default {
  title: "Max/Button",
} as Meta;

export const VariantButton = () =>
  html`
    <max-button variant="text" style="margin-right: 8px; top: 100px; left: 100px; position: absolute;">
      Text Button
    </max-button>
    <max-button variant="contained" style="margin-right: 8px;">
      Contained Button
    </max-button>
    <max-button variant="outlined">
      Outlined Button
    </max-button>
  `;

export const DisabledButton = () =>
  html`
    <max-button variant="text" style="margin-right: 8px;" disabled>
      Text Button
    </max-button>
    <max-button variant="contained" style="margin-right: 8px;" disabled>
      Contained Button
    </max-button>
    <max-button variant="outlined" disabled>
      Outlined Button
    </max-button>
  `;