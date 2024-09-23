import { isExistFileOrDir } from 'main/utils'
import Channel from '../../interface/channel'
import { DIR_OPEN, GET_FILE_PATH, OPEN_FILE_DIALOG } from './types'
import { dialog, shell } from 'electron'
import { appUserPath } from '@main/utils/path'
import { resolve } from 'path'

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
function createOpenFileDialogChannel() {
  const filePathChannel = new Channel(OPEN_FILE_DIALOG)
  filePathChannel.createTwoWayChannel(async (_, options) => {
    const result = await dialog.showOpenDialog(options)
    return result.filePaths
  })
}
function createSystemService() {
  createOpenFileDialogChannel()
  createSystemChannel()
}
export default createSystemService
