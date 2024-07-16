import fs from 'fs'
import { pwdPath, sharpPath } from './path'
const initDirectory = () => {
  const pathList = [pwdPath, sharpPath]

  pathList.forEach((item) => {
    if (!fs.existsSync(item)) {
      fs.mkdirSync(item)
    }
  })
}
export { initDirectory }
