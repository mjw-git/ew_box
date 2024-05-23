import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ElectronDevPlugin } from './plugins/vite-plugin-electron-dev';
// https://vitejs.dev/config/
export default defineConfig({
    root:path.join(__dirname,'./render'),
    server:{
        port:8889
    },
  plugins: [react(),ElectronDevPlugin()],
  resolve: {
    alias: [
      {
        find:/^@\//,
        replacement:path.resolve(__dirname,'./src')+'/'
      }
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: "@root-entry-name: default;",
        math: "always",
      },
    },
  },
});
