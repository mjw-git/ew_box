import fs from 'fs'
import { pwdPath, sharpPath } from './path'
import { PrismaClient } from '@prisma/client'
const prismaInstance = new PrismaClient()
const initDirectory = () => {
  // prisma
  const pathList = [pwdPath, sharpPath]

  pathList.forEach((item) => {
    if (!fs.existsSync(item)) {
      fs.mkdirSync(item)
    }
  })
}
export { initDirectory, prismaInstance }
