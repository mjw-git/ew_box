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

// 引入esbuild,把 electron 的 ts 打包成 js
import esbuild, { BuildResult, buildSync } from 'esbuild'
const OUT_DIR = path.join(__dirname, '../main-dist')
// 手动定义一个方法，用于进行打包的工作
const electronBuild2Js = async () => {
  // 每次都先删除target目录，然后执行新的编译动作
  // let targetExistFlag = fs.existsSync(path.join(__dirname,'../main-dist'))
  // if(targetExistFlag){
  //     console.log(OUT_DIR+'目录存在，执行删除')
  //     fs.rmSync(OUT_DIR,{recursive:true})
  // }else{
  //     console.log('electrontarget 目录不存在，无需删除')
  // }
  // 把electron 的 入口 ts 文件进行打包操作
  let context = await esbuild.context({
    entryPoints: [path.join(__dirname, '../main/index.ts'), path.join(__dirname, '../main/preload/index.ts')],
    bundle: true,
    outdir: OUT_DIR,
    loader: { '.node': 'file' }, // 配置 loader 处理 .node 文件
    // outfile:'target/electron/electronMain.js',
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
      let firstRender = true
      // 先把electron执行一下编译
      await electronBuild2Js()

      server.httpServer?.on('listening', () => {
        // 核心1 ： 获取vue3的服务地址
        let addressInfo = server.httpServer?.address() as AddressInfo
        const devUrl = `http://localhost:${addressInfo.port}`
        console.log('plugins-dev : 服务的完整地址 ： ', devUrl)

        // 核心3 ： 进程传参，发送到electron的进程中
        let electronProcess = spawn(`${electron}`, [path.join(__dirname, '../main-dist/index.js')], { stdio: 'inherit' }) as ChildProcess
        console.log('plugins-dev : electronProcess : ', electronProcess.pid)
        // 扩展功能 ： 增加 electron 的热启动功能
        fs.watch(path.join(__dirname, '../main-dist'), (e, file) => {
          // console.log(e, file)
          firstRender = false
          console.log('plugins-dev : main进程目录中的文件发生改变了')
          if (electronProcess && !firstRender) {
            electronProcess.kill()
            // 把electron执行一下编译,然后在重新执行
            // electronBuild2Js();
            electronProcess = spawn(`${electron}`, [path.join(__dirname, '../main-dist/index.js')], { stdio: 'inherit' }) as ChildProcess
          }
        })
      })
    },
  }
}
