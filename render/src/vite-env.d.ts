/// <reference types="vite/client" />

interface Window {
  electronAPI: any
  sharpApi: {
    compress: (fileList: string[], options: { type: string; quality: number }) => Promise<void>
  }
  localApi: {
    onSave: <T>(callback: (e: Electron.IpcRendererEvent, params: LocalSaveParams<T>) => void) => void
    onUpdate: <T>(callback: (e: Electron.IpcRendererEvent, params: LocalSaveParams<T>) => void) => void
    onDelete: (callback: (e: Electron.IpcRendererEvent, params: string) => void) => void
  }
  systemApi: {
    openPath: (path: string) => Promise<string>
  }
  passwordBoxApi: {
    getList: () => Promise<{ name: string; username: string; time: number }[]>
    create: (options: { name: string; username: string; password: string }) => Promise<boolean>
    enter: (key: string) => Promise<boolean>
    decrypt: (time: number) => Promise<string>
  }
}

declare namespace Local {
  type LocalSaveParams<T> = {
    name: string
    options?: { type: 'readwrite' }
    value: any
  }
}
