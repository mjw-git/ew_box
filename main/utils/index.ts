//判断文件是否存在
import fs from 'fs/promises'
import { extname, basename } from 'path'
import sharp from 'sharp'
export type DefaultImgType = 'png' | 'jpeg' | 'webp'
export async function isExistFileOrDir(path: string) {
  return fs
    .stat(path)
    .then(() => true)
    .catch(() => false)
}
export function removeLastSlash(str: string) {
  return str.endsWith('/') ? str.slice(0, str.length - 1) : str
}

export async function isImg(path: string) {
  try {
    await isExistFileOrDir(path)
    const imgReg = /\.(jpg|jpeg|png|webp)$/i
    const ext = extname(path).toLowerCase()
    console.log(ext)
    let convertExt = ext === '.jpg' ? '.jpeg' : ext
    return (imgReg.test(convertExt) ? convertExt.replace('.', '') : null) as DefaultImgType | null
  } catch (error) {
    return Promise.reject(error)
  }
}
export function formatTaskName() {
  const date = new Date()
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}${date.getHours()}时${date.getMinutes()}分`
}
export async function compressImg(options: { path: string; quality?: number; output: string; ext?: DefaultImgType }) {
  const { path, quality = 80, output, ext } = options
  const convertRxt = ext || (await isImg(path))

  if (!convertRxt) {
    return Promise.reject(new Error('type error'))
  }

  return sharp(path)
    ?.[convertRxt]?.({ quality })
    .toFile(`${removeLastSlash(output)}/${basename(path)}`)
}
