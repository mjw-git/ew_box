import Channel from 'main/interface/channel'
export const SAVE_TYPE = 'local:add'
export const UPDATE_TYPE = 'local:update'
export const DELETE_TYPE = 'local:delete'
export function save<T>(name: string, value: T, options?: { type: string }) {
  Channel.mainWindow.webContents.send(SAVE_TYPE, { name, value, options })
}
export function deleteItem(name: string, key: string) {
  Channel.mainWindow.webContents.send(DELETE_TYPE, { name, key })
}
export function updateItem<T>(name: string, value: T, options?: { type: string }) {
  Channel.mainWindow.webContents.send(UPDATE_TYPE, { name, value, options })
}
