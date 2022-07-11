type Value = string | number | boolean | null | undefined | Record<string, unknown>

type Names = Value | NamesArray

type NamesArray = Array<Names>

export default function classNames(...names: NamesArray): string {
  const classes: string[] = []
  names.forEach(name => {
    if (typeof name === 'string' || typeof name === 'number') {
      if (name) {
        classes.push(String(name))
      }
    } else if (Array.isArray(name)) {
      name.forEach(val => {
        const className = classNames(val)
        if (className) {
          classes.push(className)
        }
      })
    } else if (typeof name === 'object' && name !== null) {
      Object.keys(name).forEach(key => {
        if (name[key]) {
          classes.push(key)
        }
      })
    }
  })
  return classes.join(' ')
}