/// <reference types="vite/client" />
interface Window {
  electronAPI: any
  sharpApi: {
    compress: (fileList: string[]) => void
  }
  localApi: {
    onSave: <T>(callback: (e: Electron.IpcRendererEvent, params: LocalSaveParams<T>) => void) => void
    onUpdate: <T>(callback: (e: Electron.IpcRendererEvent, params: LocalSaveParams<T>) => void) => void
    onDelete: (callback: (e: Electron.IpcRendererEvent, params: string) => void) => void
  }
}

declare namespace Local {
  type LocalSaveParams<T> = {
    name: string
    options?: { type: 'readwrite' }
    value: any
  }
}
