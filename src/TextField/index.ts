import TextField from './TextField'

if (!window.customElements.get(TextField.is)) {
  window.customElements.define(TextField.is, TextField)
}
