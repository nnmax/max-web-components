import classNames from './classNames';

describe('classNames', () => {
  it('keeps object keys with truthy values', () => {
    expect(classNames({
      a: true,
      b: false,
      c: 0,
      d: null,
      e: undefined,
      f: 1,
    })).toEqual('a f');
  });

  it('supports heterogenous arguments', () => {
    expect(classNames({ a: true }, 'b', 0)).toEqual('a b');
  });

  it('should be trimmed', () => {
    expect(classNames('', 'b', {}, '')).toEqual('b');
  });

  it('returns an empty string for an empty configuration', () => {
    expect(classNames({})).toEqual('');
  });

  it('supports an array of class names', () => {
    expect(classNames(['a', 'b'])).toEqual('a b');
  });

  it('joins array arguments with string arguments', () => {
    expect(classNames(['a', 'b'], 'c')).toEqual('a b c');
    expect(classNames('c', ['a', 'b'])).toEqual('c a b');
  });

  it('handles multiple array arguments', () => {
    expect(classNames(['a', 'b'], ['c', 'd'])).toEqual('a b c d');
  });

  it('handles arrays that include falsy and true values', () => {
    expect(classNames(['a', 0, null, undefined, false, true, 'b'])).toEqual('a b');
  });

  it('handles arrays that include arrays', () => {
    expect(classNames(['a', ['b', 'c']])).toEqual('a b c');
  });

  it('handles arrays that include objects', () => {
    expect(classNames(['a', { b: true, c: false }])).toEqual('a b');
  });

  it('handles deep array recursion', () => {
    expect(classNames(['a', ['b', ['c', { d: true }]]])).toEqual('a b c d');
  });

  it('handles arrays that are empty', () => {
    expect(classNames('a', [])).toEqual('a');
  });

  it('handles nested arrays that have empty nested arrays', () => {
    expect(classNames('a', [[]])).toEqual('a');
  });

  it('handles all types of truthy and falsy property values as expected', () => {
    expect(classNames({
      // falsy:
      null: null,
      emptyString: '',
      noNumber: NaN,
      zero: 0,
      negativeZero: -0,
      false: false,
      undefined,

      // truthy (literally anything else):
      nonEmptyString: 'foobar',
      whitespace: ' ',
      function: Object.prototype.toString,
      emptyObject: {},
      nonEmptyObject: { a: 1, b: 2 },
      emptyList: [],
      nonEmptyList: [1, 2, 3],
      greaterZero: 1,
    })).toEqual('nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero');
  });
});
