import { contextBridge, ipcRenderer } from 'electron/renderer'
import { COMPRESS_TYPE, CompressOptions } from '../../ipc/sharp/type'

export default function exposeSharpApi() {
  contextBridge.exposeInMainWorld('sharpApi', {
    compress: (list: string[], options: CompressOptions) => ipcRenderer.invoke(COMPRESS_TYPE, list, options),
  })
}
