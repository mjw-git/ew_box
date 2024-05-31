import { ipcMain } from 'electron/main'

class Channel {
  name: string
  static listenerMap: Map<string, ElSelf.IpcMainOn> = new Map()
  constructor(name: string) {
    this.name = name
  }
  createOneWayChannel(handle: ElSelf.IpcMainOn) {
    ipcMain.on(this.name, handle)
    Channel.listenerMap.set(this.name, handle)
  }
  remoteListen(name: string) {
    Channel.listenerMap.delete(name)
    ipcMain.removeListener(name, Channel.listenerMap.get(name)!)
  }

  createTwoWayChannel(handle: ElSelf.IpcMainInvoke) {
    ipcMain.handle(this.name, handle)
  }
  remoteTwoWayChannel(name: string) {
    ipcMain.removeHandler(name)
  }
}
export default Channel
