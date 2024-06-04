import { app } from 'electron'
import electronIsDev from 'electron-is-dev'
import { save, updateItem } from 'main/local'
import { compressImg, formatTaskName, isExistFileOrDir } from 'main/utils'
import { v4 as uuid } from 'uuid'
import { join } from 'path'
import { mkdirSync } from 'fs'
import { COMPRESS_STATUS } from './type'

async function compressImageList(imgList: string[]) {
  const url = app.getAppPath()
  const _uuid = uuid()
  const task_name = formatTaskName()
  save('task', { name: task_name, task_id: _uuid, create_tm: new Date().getTime() }, { type: 'readwrite' })
  for (const img of imgList) {
    const img_uuid = uuid()
    const temp = { id: img_uuid, task_id: _uuid, path: img, status: COMPRESS_STATUS.PROCESSING }
    save('task_img_item', temp)
    const outputPath = electronIsDev ? join(__dirname, `../testImg/${task_name}_${_uuid}`) : url
    const is_exit = await isExistFileOrDir(outputPath)
    if (!is_exit) {
      mkdirSync(outputPath)
    }
    compressImg({ path: img, output: outputPath })
      .then(() => {
        updateItem('task_img_item', { ...temp, status: COMPRESS_STATUS.SUCCESS })
      })
      .catch((err) => {
        updateItem('task_img_item', { ...temp, status: COMPRESS_STATUS.WAITING })
      })
  }
}
export default compressImageList
