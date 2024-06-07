import { contextBridge, ipcRenderer } from 'electron/renderer'
import { DIR_OPEN } from 'main/ipc/system/types'

export default function exposeSystemApi() {
  contextBridge.exposeInMainWorld('systemApi', {
    openPath: (path: string) => ipcRenderer.invoke(DIR_OPEN, path),
  })
}
