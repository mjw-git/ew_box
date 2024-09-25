// 开发环境的自定义插件

import { type Plugin } from 'vite'

import type { AddressInfo } from 'net'
// 导入子进程
import { ChildProcess, spawn } from 'child_process'
// 导入electron命令
import electron from 'electron'
// 导入 文件操作
import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'

// 引入esbuild,把 electron 的 ts 打包成 js
import esbuild from 'esbuild'
import { debounce } from 'lodash'
const OUT_DIR = path.join(__dirname, '../main-dist')

const lockFilePath = path.resolve(__dirname, '../electron.lock')
let isWatch = false
const runElectron = () => {
  const exit = fs.existsSync(lockFilePath)
  if (exit) {
    const pid = fs.readFileSync(lockFilePath, 'utf-8').toString()
    if (pid) {
      try {
        process.kill(+pid, 'SIGTERM')
      } catch (error) {
        console.log('关闭electron进程失败')
      }
    }
  }

  let electronProcess = spawn(`${electron}`, [path.join(__dirname, '../main-dist/index.js')], { stdio: 'inherit' }) as ChildProcess

  fs.writeFileSync(lockFilePath, `${electronProcess.pid}`)
}

function createElectron() {
  if (!isWatch) {
    const mainDir = path.join(__dirname, '../main-dist')
    const debouncedCreateElectron = debounce(() => {
      runElectron()
    }, 200)
    chokidar.watch(mainDir, { ignoreInitial: true }).on('change', (e, file) => {
      debouncedCreateElectron()
    })
    isWatch = true
  }
}

// 手动定义一个方法，用于进行打包的工作
const electronBuild2Js = async () => {
  // 把electron 的 入口 ts 文件进行打包操作
  let context = await esbuild.context({
    entryPoints: [path.join(__dirname, '../main/index.ts'), path.join(__dirname, '../main/preload/index.ts')],
    bundle: true,
    outdir: OUT_DIR,
    loader: { '.node': 'file' }, // 配置 loader 处理 .node 文件
    platform: 'node',
    target: 'node16',
    external: ['electron', 'sharp'],
  })
  await context.watch()

  console.log('编译完成✅ ')
}

// 自定义的插件的逻辑
export const ElectronDevPlugin = (): Plugin => {
  return {
    name: 'electron-dev-plugin',
    //配置服务的钩子
    async configureServer(server) {
      server.httpServer?.on('listening', async () => {
        let addressInfo = server.httpServer?.address() as AddressInfo
        const devUrl = `http://localhost:${addressInfo.port}`
        console.log('plugins-dev : 服务的完整地址 ： ', devUrl)
        await electronBuild2Js()
        createElectron()

        const mainDir = path.join(__dirname, '../main-dist')
        if (!fs.existsSync(mainDir)) {
          fs.mkdirSync(mainDir)
        }
      })
    },
  }
}
