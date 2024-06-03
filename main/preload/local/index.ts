import { contextBridge, ipcRenderer } from 'electron/renderer'
import { DELETE_TYPE, SAVE_TYPE, UPDATE_TYPE } from 'main/local'

export default function exposeLocalApi() {
  contextBridge.exposeInMainWorld('localApi', {
    onSave: <T>(callback: (e: Electron.IpcRendererEvent, params: T) => void) => ipcRenderer.on(SAVE_TYPE, (_event, value) => callback(_event, value)),
    onUpdate: <T>(callback: (e: Electron.IpcRendererEvent, params: T) => void) => ipcRenderer.on(UPDATE_TYPE, (_event, value) => callback(_event, value)),
    onDelete: <T>(callback: (e: Electron.IpcRendererEvent, params: T) => void) => ipcRenderer.on(DELETE_TYPE, (_event, value) => callback(_event, value)),
  })
}
