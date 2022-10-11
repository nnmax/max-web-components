/**
 * 根据传入的对象，组装标准的 HTML attribute 字符串
 * @param attributes 需要组装的 attribute 集合
 * @returns 组装好的 HTML attribute 字符串
 * @example
 *  insertAttributeToHTML({
 *    value: '',
 *    name: 'foo',
 *    label: null,
 *    disabled: undefined,
 *    cba: 123
 *  }) // returns `value name="foo" cba="123"`
 */
export default function insertAttributeToHTML(attributes: Record<string, unknown>) {
  if (!attributes) return ''
  return Object.keys(attributes)
    .reduce((previous, currentName) => {
      const value = attributes[currentName]
      if (value === null || value === undefined) {
        return previous
      }
      if (value === '') {
        return `${previous} ${currentName}`
      }
      return `${previous} ${currentName}="${value}"`
    }, '')
    .trim()
}
