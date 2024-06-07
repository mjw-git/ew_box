import { isExistFileOrDir } from 'main/utils'
import Channel from '../../interface/channel'
import { DIR_OPEN } from './types'
import { shell } from 'electron'

function createSystemChannel() {
  const sharpChannel = new Channel(DIR_OPEN)
  sharpChannel.createTwoWayChannel(async (e, path) => {
    const isExist = await isExistFileOrDir(path)
    if (isExist) {
      shell.openPath(path)
      return 'success'
    } else {
      return 'error'
    }
  })
}
function createSystemService() {
  createSystemChannel()
}
export default createSystemService
