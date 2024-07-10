import { decrypt, encrypt, getMachineId, isExistFileOrDir } from '@main/utils'
import { app } from 'electron'
import fs from 'fs'
import { join } from 'path'
import crypto from 'crypto'
import electronIsDev from 'electron-is-dev'
const createSecretKey = async (key: string) => {
  const path = app.getAppPath()
  const machineId = getMachineId()
  console.log(key)
  console.log(machineId)

  const lastPath = electronIsDev ? join(__dirname, `../testImg/password`) : join(path, `./password/secret_key`)
  const isExist = await isExistFileOrDir(lastPath)
  const cKey = crypto.pbkdf2Sync(key, machineId, 100000, 32, 'sha256')
  if (isExist) {
    const secretKey = fs.readFileSync(lastPath)
    try {
      decrypt(secretKey.toString(), cKey)

      return true
    } catch (error) {
      return false
    }
  } else {
    const secretKey = encrypt(key, cKey)
    console.log(secretKey)

    fs.writeFileSync(lastPath, secretKey, 'utf-8')
    return true
  }
}
export { createSecretKey }
