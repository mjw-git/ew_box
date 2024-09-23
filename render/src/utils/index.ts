export const PIC_PATH_PREFIX = 'atom:///'
export const randomColor = ['blue-400', 'pink-500', 'slate-400', 'red-400', 'orange-400']
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
