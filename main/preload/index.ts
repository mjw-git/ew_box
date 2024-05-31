import { ipcRenderer, contextBridge } from 'electron/renderer'
import exposeSharpApi from './sharp'

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
})
exposeSharpApi()
