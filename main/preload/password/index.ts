import { contextBridge, ipcRenderer } from 'electron/renderer'
import { CREATE_TYPE, DECRYPT_PWD_TYPE, ENTER_TYPE, EnterPasswordBoxType, GET_PWD_LIST_TYPE } from '@main/ipc/password/type'

export default function exposePasswordBoxApi() {
  contextBridge.exposeInMainWorld('passwordBoxApi', {
    enter: (key: string) => ipcRenderer.invoke(ENTER_TYPE, key),
    create: (options: EnterPasswordBoxType) => ipcRenderer.invoke(CREATE_TYPE, options),
    getList: () => ipcRenderer.invoke(GET_PWD_LIST_TYPE),
    decrypt: (time: number) => ipcRenderer.invoke(DECRYPT_PWD_TYPE, time),
  })
}
