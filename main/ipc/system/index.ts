import { isExistFileOrDir } from 'main/utils'
import Channel from '../../interface/channel'
import { DIR_OPEN } from './types'
import { shell } from 'electron'
import { appUserPath } from '@main/utils/path'

function createSystemChannel() {
  const sharpChannel = new Channel(DIR_OPEN)
  sharpChannel.createTwoWayChannel(async (_, path) => {
    if (path === 'processResource') {
      shell.openPath(process.resourcesPath)
      return
    } else if (path === 'appPath') {
      shell.openPath(appUserPath)
      return
    }
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
