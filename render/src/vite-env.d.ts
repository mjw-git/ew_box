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
    openFileDialog: (options: Electron.OpenDialogOptions) => Promise<string[]>
    openPath: (path: string) => Promise<string>
  }
  passwordBoxApi: {
    getList: () => Promise<{ remark: string; username: string; create_tm: number; id: number }[]>
    create: (options: { remark: string; username: string; password: string }) => Promise<boolean>
    enter: (key: string) => Promise<boolean>
    decrypt: (time: number, key: string) => Promise<string>
    delete: (time: number) => Promise<void>
  }
}

declare namespace Local {
  type LocalSaveParams<T> = {
    name: string
    options?: { type: 'readwrite' }
    value: any
  }
}
