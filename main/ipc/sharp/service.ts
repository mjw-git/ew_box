import { app } from 'electron'
import electronIsDev from 'electron-is-dev'
import { save, updateItem } from 'main/local'
import { compressImg, formatTaskName, getFileSize, isExistFileOrDir } from 'main/utils'
import { v4 as uuid } from 'uuid'
import { join, basename } from 'path'
import { mkdirSync } from 'fs'
import { COMPRESS_STATUS, CompressOptions } from './type'

async function compressImageList(imgList: string[], options: CompressOptions) {
  const url = app.getAppPath()
  const _uuid = uuid()

  const task_name = formatTaskName()
  const outputPath = electronIsDev ? join(__dirname, `../testImg/${task_name}_${_uuid}`) : url

  save('task', { task_name: task_name, path: outputPath, task_id: _uuid, create_tm: new Date().getTime() }, { type: 'readwrite' })
  for (const img of imgList) {
    const img_uuid = uuid()
    const size = await getFileSize(img)
    const temp = { id: img_uuid, task_id: _uuid, path: img, basename: basename(img), status: COMPRESS_STATUS.PROCESSING, size }
    save('task_img_item', temp)
    const is_exit = await isExistFileOrDir(outputPath)
    if (!is_exit) {
      mkdirSync(outputPath)
    }

    compressImg({ path: img, output: outputPath, quality: options.quality, ext: options.type === 'self' ? undefined : options.type })
      .then(async (path) => {
        const size = await getFileSize(path)
        updateItem('task_img_item', { ...temp, status: COMPRESS_STATUS.SUCCESS, compressed_size: size })
      })
      .catch(() => {
        updateItem('task_img_item', { ...temp, status: COMPRESS_STATUS.WAITING })
      })
  }
}
export default compressImageList
