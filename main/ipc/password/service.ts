import { decrypt, encrypt, getMachineId, isExistFileOrDir } from '@main/utils'
import fs from 'fs'
import { join, resolve } from 'path'
import crypto from 'crypto'
import electronIsDev from 'electron-is-dev'
import { EnterPasswordBoxType } from './type'
import { pwdPath } from '@main/utils/path'
import { prismaInstance } from '@main/utils/init'
import logger from '@main/utils/log'

const lastSecretKeyPath = electronIsDev ? join(__dirname, `../testImg/password`) : resolve(pwdPath, './secret_key')
const lastPwdPath = electronIsDev ? join(__dirname, `../testImg/pwd`) : resolve(pwdPath, './pwd')
const createSecretKey = async (key: string, first = true) => {
  const machineId = getMachineId()
  const secretKey = await prismaInstance.config.findUnique({
    where: {
      key: 'pwd_secret',
    },
  })
  const cKey = crypto.pbkdf2Sync(key, machineId, 100000, 32, 'sha256')
  if (secretKey) {
    try {
      decrypt(secretKey.value.toString(), cKey)

      return true
    } catch (error) {
      logger.error('密码错误', error)
      return false
    }
  } else {
    if (first) {
      const secretKey = encrypt(key, cKey)
      await prismaInstance.config.create({
        data: {
          key: 'pwd_secret',
          value: secretKey,
        },
      })
      return true
    } else {
      return false
    }
  }
}
const createPwd = async (options: EnterPasswordBoxType) => {
  const { password, username, remark } = options

  const secretKey = await prismaInstance.config.findUnique({
    where: {
      key: 'pwd_secret',
    },
  })

  if (!secretKey) return false

  try {
    const cKey = Buffer.from(secretKey.value.slice(0, 32))
    const encryptPassword = encrypt(password, cKey)
    const encryptUsername = encrypt(username, cKey)
    await prismaInstance.password.create({
      data: {
        create_tm: Math.floor(new Date().getTime() / 1000),
        username: encryptUsername,
        password: encryptPassword,
        remark: remark,
      },
    })

    return true
  } catch (err) {
    logger.error('save error', err)
    return false
  }
}

const decryptPwd = async (id: number, key: string) => {
  const correct = await createSecretKey(key, false)
  if (!correct) return Promise.reject('error')
  const secretKey = await prismaInstance.config.findUnique({
    where: {
      key: 'pwd_secret',
    },
  })
  const cKey = Buffer.from(secretKey.value.slice(0, 32))
  const item = await prismaInstance.password.findUnique({ where: { id: id } })

  if (item) {
    const password = item.password

    return decrypt(password, cKey)
  }
  return ''
}
const deletePwd = async (id: number) => {
  await prismaInstance.password.delete({
    where: { id },
  })
}

const getPwdList = async () => {
  const secretKey = await prismaInstance.config.findUnique({ where: { key: 'pwd_secret' } })

  try {
    const cKey = Buffer.from(secretKey.value.slice(0, 32))
    const pwdList = await prismaInstance.password.findMany({
      select: {
        create_tm: true,
        id: true,
        username: true,
        remark: true,
      },
    })
    return pwdList.map((i) => ({ ...i, username: decrypt(i.username, cKey) }))
  } catch (error) {
    return []
  }
}
export { createSecretKey, createPwd, getPwdList, decryptPwd, deletePwd }
