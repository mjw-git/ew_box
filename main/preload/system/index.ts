import { contextBridge, ipcRenderer } from 'electron/renderer'
import { DIR_OPEN, OPEN_FILE_DIALOG } from 'main/ipc/system/types'

export default function exposeSystemApi() {
  contextBridge.exposeInMainWorld('systemApi', {
    openPath: (path: string) => ipcRenderer.invoke(DIR_OPEN, path),
    openFileDialog: (options: Electron.OpenDialogOptions) => ipcRenderer.invoke(OPEN_FILE_DIALOG, options),
  })
}
