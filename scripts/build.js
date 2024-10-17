/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const esbuild = require('esbuild')
const OUT_DIR = path.join(__dirname, '../main-dist')
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
  process.exit(0)
}
electronBuild2Js()
