import { decrypt, encrypt, getMachineId, isExistFileOrDir } from '@main/utils'
import fs from 'fs'
import { join, resolve } from 'path'
import crypto from 'crypto'
import electronIsDev from 'electron-is-dev'
import { EnterPasswordBoxType } from './type'
import sudo from 'sudo-prompt'
import { pwdPath } from '@main/utils/path'

const lastSecretKeyPath = electronIsDev ? join(__dirname, `../testImg/password`) : resolve(pwdPath, './secret_key')
const lastPwdPath = electronIsDev ? join(__dirname, `../testImg/pwd`) : resolve(pwdPath, './pwd')
const createSecretKey = async (key: string) => {
  const machineId = getMachineId()

  const isExist = await isExistFileOrDir(lastSecretKeyPath)
  const cKey = crypto.pbkdf2Sync(key, machineId, 100000, 32, 'sha256')
  if (isExist) {
    const secretKey = fs.readFileSync(lastSecretKeyPath)
    try {
      decrypt(secretKey.toString(), cKey)

      return true
    } catch (error) {
      return false
    }
  } else {
    const secretKey = encrypt(key, cKey)

    fs.writeFileSync(lastSecretKeyPath, secretKey, 'utf-8')
    return true
  }
}
const createPwd = (options: EnterPasswordBoxType) => {
  const { password, username, name } = options

  const secretKey = fs.readFileSync(lastSecretKeyPath).toString()

  if (!secretKey) return false

  try {
    const cKey = Buffer.from(secretKey.slice(0, 32))
    const encryptPassword = encrypt(password, cKey)
    const encryptUsername = encrypt(username, cKey)
    const pwd = `${name}#${encryptUsername}#${encryptPassword}#${Math.floor(new Date().getTime() / 1000)}\n`

    fs.appendFileSync(lastPwdPath, pwd)
    return true
  } catch (err) {
    return false
  }
}

const decryptPwd = (time: number) => {
  const secretKey = fs.readFileSync(lastSecretKeyPath).toString()
  const cKey = Buffer.from(secretKey.slice(0, 32))
  const pwd = fs.readFileSync(lastPwdPath)
  const findPwd = pwd
    .toString()
    .split('\n')
    .find((i) => i.includes(time + ''))
  if (findPwd) {
    const [, , password] = findPwd.split('#')
    const options = {
      name: 'Pluto App',
      icns: join(__dirname, '../assets/Icon.icns'), // macOS 上可以指定图标
    }

    return new Promise((resolve, reject) => {
      sudo.exec('echo pluto!', options, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve(decrypt(password, cKey))
        }
      })
    })
  }
}
const deletePwd = (time: number) => {
  const pwd = fs.readFileSync(lastPwdPath)
  const pwdList = pwd
    .toString()
    .split('\n')
    .filter((i) => i)
  const findPwdIdx = pwdList.findIndex((i) => i.includes(time + ''))
  if (findPwdIdx !== -1) {
    pwdList.splice(findPwdIdx, 1)
    fs.writeFileSync(lastPwdPath, pwdList.join('\n') + '\n')
  }
}

const getPwdList = () => {
  const secretKey = fs.readFileSync(lastSecretKeyPath).toString()

  try {
    const cKey = Buffer.from(secretKey.slice(0, 32))
    const pwd = fs.readFileSync(lastPwdPath)
    const pwdList = pwd
      .toString()
      .split('\n')
      .filter((i) => i)
      .map((item) => {
        const [name, username, , time] = item.split('#')

        return {
          name,
          username: decrypt(username, cKey),
          time: +time,
        }
      })

    return pwdList
  } catch (error) {
    return []
  }
}
export { createSecretKey, createPwd, getPwdList, decryptPwd, deletePwd }
