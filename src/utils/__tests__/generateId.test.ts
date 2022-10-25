import { expect } from '@open-wc/testing'
import generateId from '../generateId'

describe('testing generateId()', () => {
  it('should generate different ids', () => {
    expect(generateId()).to.be.eq('0')
    expect(generateId()).to.be.eq('1')
    expect(generateId()).to.be.eq('2')
    expect(generateId('foo')).to.be.eq('foo-3')
    expect(generateId('bar')).to.be.eq('bar-4')
    expect(generateId('')).to.be.eq('5')
  })
})
