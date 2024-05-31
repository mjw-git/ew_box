import { ipcMain } from 'electron/main'
import Channel from '../../interface/channel'
import { ipcRenderer, contextBridge } from 'electron/renderer'
import { COMPRESS_TYPE } from './type'

function createSharpCompressChannel() {
  const sharpChannel = new Channel(COMPRESS_TYPE)
  sharpChannel.createTwoWayChannel((e, list) => {
    console.log(e, list)
  })
}
function createSharpService() {
  createSharpCompressChannel()
}
export default createSharpService
