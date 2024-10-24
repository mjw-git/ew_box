//判断文件是否存在
import fs from 'fs/promises'
import { extname, basename, parse } from 'path'
import sharp from 'sharp'
import { machineIdSync } from 'node-machine-id'
import crypto from 'crypto'

export function encrypt(text: string, key: Buffer) {
  const iv = crypto.randomBytes(16) // 生成一个随机的初始化向量 (IV)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}
export function decrypt(text: string, key: Buffer) {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift()!, 'hex')
  const encryptedText = textParts.join(':')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
export const getMachineId = () => {
  return machineIdSync()
}
export async function isExistFileOrDir(path: string) {
  return fs
    .stat(path)
    .then(() => true)
    .catch(() => false)
}
export function removeLastSlash(str: string) {
  return str.endsWith('/') ? str.slice(0, str.length - 1) : str
}
export async function getFileSize(path: string) {
  return fs.stat(path).then((stats) => {
    return stats.size
  })
}

export async function isImg(path: string) {
  try {
    await isExistFileOrDir(path)
    const imgReg = /\.(jpg|jpeg|png|webp)$/i
    const ext = extname(path).toLowerCase()
    let convertExt = ext === '.jpg' ? '.jpeg' : ext
    return (imgReg.test(convertExt) ? convertExt.replace('.', '') : null) as SharpSpace.DefaultImgType | null
  } catch (error) {
    return Promise.reject(error)
  }
}

export function formatTaskName() {
  const date = new Date()
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分`
}

export async function compressImg(options: { path: string; quality?: number; output: string; ext?: SharpSpace.DefaultImgType }) {
  const { path, quality = 80, output, ext } = options

  const convertRxt = ext || (await isImg(path))

  if (!convertRxt) {
    return Promise.reject(new Error('type error'))
  }

  const savePath = `${removeLastSlash(output)}/${parse(basename(path)).name}.${convertRxt}`

  return sharp(path)
    ?.[convertRxt]?.({ quality })
    .toFile(savePath)
    .then(() => {
      return savePath
    })
}
