/// <reference types="vite/client" />
interface Window {
  electronAPI: any
  sharpApi: {
    compress: (fileList: string[]) => void
  }
}
