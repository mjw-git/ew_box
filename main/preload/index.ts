import { ipcRenderer, contextBridge } from 'electron/renderer'

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
})
