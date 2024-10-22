import fs from 'fs'
import { resolve, join } from 'path'
import { fork } from 'child_process'
import { appUserPath, sharpPath } from './path'
import { PrismaClient } from '@prisma/client'
import { app } from 'electron'
import electronIsDev from 'electron-is-dev'
import logger from './log'
import fsExtra from 'fs-extra'

const dbFilePath = electronIsDev ? './dev.db' : join(appUserPath, 'resources', 'prisma', 'dev.db')
process.env.DATABASE_URL = `file:${dbFilePath}`
const appUnpackedPath = app.getAppPath().replace('app.asar', 'app.asar.unpacked')
const queryPath = electronIsDev ? resolve(__dirname, '../node_modules/@prisma/engines/libquery_engine-darwin-arm64.dylib.node') : join(process.resourcesPath, 'resources/engines/libquery_engine-darwin-arm64.dylib.node')
const schemePath = electronIsDev ? resolve(__dirname, '../node_modules/@prisma/engines/schema-engine-darwin-arm64') : resolve(appUnpackedPath, './node_modules/@prisma/engines/schema-engine-darwin-arm64')
// process.env.PRISMA_QUERY_ENGINE_BINARY = queryPath
logger.info(process.env, 'env')
const prismaInstance = new PrismaClient({
  __internal: {
    engine: {
      binaryPath: queryPath,
    },
  },
} as any)

export async function runPrisma(command: string[]) {
  try {
    const exitCode = await new Promise((r, _) => {
      const prismaPath = resolve(electronIsDev ? resolve(__dirname, '../node_modules') : resolve(appUnpackedPath, './node_modules'), 'prisma', 'build', 'index.js')
      logger.info(process.cwd(), 'cwd')
      const child = fork(prismaPath, command, {
        cwd: electronIsDev ? process.cwd() : join(appUserPath, 'resources'),
        env: {
          ...process.env,
          DATABASE_URL: process.env.DATABASE_URL,
          PRISMA_QUERY_ENGINE_LIBRARY: queryPath,
          PRISMA_SCHEMA_ENGINE_BINARY: schemePath,
        },
        stdio: 'pipe',
      })

      child.on('message', (msg) => {
        logger.info(msg)
      })

      child.on('error', (err) => {
        logger.error('Child process got error:', err)
      })

      child.on('close', (code) => {
        logger.info(code)
        r(code)
      })

      child.stdout?.on('data', function (data) {
        // console.log(data)

        logger.info('prisma: ', data.toString())
      })

      child.stderr?.on('data', function (data) {
        logger.error('prisma: ', data.toString())
      })
    })

    if (exitCode !== 0) {
      throw Error(`command ${command} failed with exit code ${exitCode}`)
    }

    return exitCode
  } catch (e) {
    logger.error(e)
    throw e
  }
}
export const initDb = async () => {
  try {
    const is_exist = fsExtra.existsSync(join(app.getPath('userData'), 'resources', 'dev.db'))
    if (is_exist) {
      fsExtra.copySync(join(process.resourcesPath, 'resources', 'prisma', 'migrations'), join(app.getPath('userData'), 'resources', 'prisma', 'migrations'))
    } else {
      fsExtra.copySync(join(process.resourcesPath, 'resources', 'prisma'), join(app.getPath('userData'), 'resources', 'prisma'))
    }
  } catch (error) {
    logger.error('after pack', error)
  }
  try {
    await runPrisma(['migrate', 'deploy'])
  } catch (error) {
    logger.error('migrate deploy error', error)
  }
}
const initDirectory = () => {
  // prisma
  const pathList = [sharpPath]

  pathList.forEach((item) => {
    if (!fs.existsSync(item)) {
      fs.mkdirSync(item)
    }
  })
}
export { initDirectory, prismaInstance }
