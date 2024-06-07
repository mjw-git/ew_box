export function convertBytes(bytes: number, unit = 'B') {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = 0

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }

  return `${bytes.toFixed(2)} ${units[i]}`
}
