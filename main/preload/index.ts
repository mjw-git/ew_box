import { ipcRenderer, contextBridge } from 'electron/renderer'
import exposeSharpApi from './sharp'
import exposeLocalApi from './local'
import exposeSystemApi from './system'

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
})
exposeSharpApi()
exposeLocalApi()
exposeSystemApi()
