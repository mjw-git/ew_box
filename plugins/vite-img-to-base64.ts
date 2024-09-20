import { type Plugin } from 'vite'
import fs from 'fs'
import { resolve, extname } from 'path'

const imgFileReg = /\.(png|jpe?g|gif|svg|webp)$/

export const ViteImgToBase64 = (): Plugin => {
  return {
    enforce: 'pre',
    name: 'viteImgToBase64',
    load(id: string) {
      if (imgFileReg.test(id)) {
        const filePath = resolve(id)
        const fileContent = fs.readFileSync(filePath)
        const base64 = fileContent.toString('base64')
        const mimeType = getMimeType(id)
        return `export default "data:${mimeType};base64,${base64}"`
      }
    },
  }
}

function getMimeType(filePath: string) {
  const ext = extname(filePath).toLowerCase()
  switch (ext) {
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.gif':
      return 'image/gif'
    case '.svg':
      return 'image/svg+xml'
    case '.webp':
      return 'image/webp'
    default:
      return ''
  }
}
