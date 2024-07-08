declare namespace ElSelf {
  type IpcMainOn = (event: Electron.IpcMainEvent, ...args: any[]) => void
  type IpcMainInvoke = (event: Electron.IpcMainInvokeEvent, ...args: any[]) => void
}
declare namespace SharpSpace {
  export type DefaultImgType = 'png' | 'jpeg' | 'webp'
}
