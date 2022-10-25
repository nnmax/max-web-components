let count = 0

/**
 * 生成全局唯一的 ID 并返回
 * @param prefix 需要拼接的前缀
 */
const generateId = (prefix?: string): string => {
  if (prefix) {
    return `${prefix}-${count++}`
  }
  return `${count++}`
}

export default generateId
