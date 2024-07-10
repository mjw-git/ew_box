import { contextBridge, ipcRenderer } from 'electron/renderer'
import { ENTER_TYPE } from '@main/ipc/password/type'

export default function exposePasswordBoxApi() {
  contextBridge.exposeInMainWorld('passwordBoxApi', {
    enter: (key: string) => ipcRenderer.invoke(ENTER_TYPE, key),
  })
}
