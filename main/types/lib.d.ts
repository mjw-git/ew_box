declare namespace ElSelf {
  type IpcMainOn = (event: Electron.IpcMainEvent, ...args: any[]) => void
  type IpcMainInvoke = (event: Electron.IpcMainInvokeEvent, ...args: any[]) => void
}
