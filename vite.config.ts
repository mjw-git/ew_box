import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElectronDevPlugin } from './plugins/vite-plugin-electron-dev'
import { ViteLessGlobalVars } from './plugins/vite-less-global-vars'
console.log(path.resolve(process.cwd(), 'src/assets/svg'))
// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, './render'),
  server: {
    port: 8889,
  },
  plugins: [
    react(),
    ViteLessGlobalVars({ globalPath: path.resolve(process.cwd(), 'render/src/styles/normal.less') }),
    ElectronDevPlugin(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'render/src/assets/svg')], //svg地址
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './render/src'),
      '@main': path.resolve(__dirname, './main'),
    },
  },
  optimizeDeps: {
    exclude: ['sharp'],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
        math: 'always',
      },
    },
  },
})
