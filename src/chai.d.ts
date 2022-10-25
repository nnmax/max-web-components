import type { DiffOptions } from '@open-wc/testing/node_modules/@open-wc/semantic-dom-diff/get-diffable-html'

declare global {
  namespace Chai {
    interface Assertion {
      equalSnapshot(options?: DiffOptions): Assertion
    }
  }
}
