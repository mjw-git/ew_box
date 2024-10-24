import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElectronDevPlugin } from './plugins/vite-plugin-electron-dev'
import { ViteLessGlobalVars } from './plugins/vite-less-global-vars'
import { ViteImgToBase64 } from './plugins/vite-img-to-base64'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    outDir: path.join(__dirname, './app/render-dist'),
  },
  envDir: path.join(__dirname, './render'),
  root: path.join(__dirname, './render'),
  base: mode === 'production' ? './' : '/',
  server: {
    port: 8889,
  },
  define: {
    'import.meta.env.PORT': JSON.stringify(process.env.PORT),
  },
  plugins: [
    react(),
    ViteLessGlobalVars({ globalPath: path.resolve(process.cwd(), 'render/src/styles/normal.less') }),
    ElectronDevPlugin(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'render/src/assets/svg')], //svg地址
      symbolId: 'icon-[dir]-[name]',
    }),
    ViteImgToBase64(),
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
}))
