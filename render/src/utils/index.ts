import dayjs from 'dayjs'

export const PIC_PATH_PREFIX = 'atom:///'
export const randomColor = ['blue-400', 'pink-500', 'slate-400', 'red-400', 'orange-400']
export const bookIcon = ['game', 'shoe', 'car', 'rice', 'house']
export function convertBytes(bytes: number) {
  if (!bytes) return '-'
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = 0

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }

  return `${bytes.toFixed(2)} ${units[i]}`
}
export const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const yearOptions = Array.from({ length: (dayjs().year() - 2018) * 2 }).map((_, index) => 2018 + index)
