import { expect } from '@open-wc/testing'
import insertAttributeToHTML from '../insertAttributeToHTML'

describe('Testing insertAttributeToHTML.ts', () => {
  it('insertAttributeToHTML()', () => {
    expect(
      insertAttributeToHTML({
        value: '',
        name: 'foo',
        label: null,
        disabled: undefined,
        cba: 123,
      })
    ).to.be.eq('value name="foo" cba="123"')

    // @ts-expect-error Deliberately not passing in parameters to verify the correctness of the function
    expect(insertAttributeToHTML()).to.be.eq('')
  })
})
