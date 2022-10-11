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
    ).toBe('value name="foo" cba="123"')

    // @ts-expect-error Deliberately not passing in parameters to verify the correctness of the function
    expect(insertAttributeToHTML()).toBe('')
  })
})
