import { contextBridge, ipcRenderer } from 'electron/renderer'
import { COMPRESS_TYPE } from '../../ipc/sharp/type'

export default function exposeSharpApi() {
  contextBridge.exposeInMainWorld('sharpApi', {
    compress: (list: string[]) => ipcRenderer.invoke(COMPRESS_TYPE, list),
  })
}
